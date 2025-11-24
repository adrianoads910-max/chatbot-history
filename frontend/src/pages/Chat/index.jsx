import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

export default function Chat() {
  const { token } = useAuth();

  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Limpa estado ao sair da página — evita reaproveitar conversa anterior
  useEffect(() => {
    return () => {
      setThread(null);
      setMessages([]);
    };
  }, []);

  // ✅ Enviar mensagem — cria thread apenas quando necessário
  const handleSend = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      let activeThread = thread;

      // ✅ Cria thread somente ao enviar a primeira mensagem
      if (!activeThread) {
        const newThread = await api.post(
          "/threads/",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        activeThread = newThread.data;
        setThread(activeThread);
      }

      const res = await api.post(
        `/threads/${activeThread.id}/messages/`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // adiciona mensagem + resposta bot
      setMessages((prev) => [
        ...prev,
        res.data.user_message,
        {
          id: Date.now(),
          sender: null,
          sender_name: "Chatbot",
          text: res.data.bot_response,
        },
      ]);

      setText("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar active="chat" />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex-1 overflow-y-auto bg-gray-100 shadow rounded p-4 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 p-3 rounded-xl max-w-[70%] ${
                msg.sender
                  ? "bg-brand-blue-light text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {!msg.sender && (
                <div className="text-sm font-bold mb-1">Chatbot</div>
              )}
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded border border-brand-blue-dark bg-gray-50"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-brand-blue-light hover:bg-brand-blue-dark text-white rounded disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={18} />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
