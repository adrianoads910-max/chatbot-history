import { useEffect, useState, useCallback } from "react";
import api from "../../api/api";


export default function Chat() {
  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Criar thread ao abrir o chat
  const initThread = useCallback(async () => {
    try {
      const res = await api.post("/threads/");
      setThread(res.data);
    } catch (error) {
      console.error("Erro ao criar thread:", error);
    }
  }, []);

  useEffect(() => {
    initThread();
  }, [initThread]);

  // Carregar mensagens quando a thread existir
  const loadMessages = useCallback(async () => {
    if (!thread) return;

    try {
      const res = await api.get(`/threads/${thread.id}/messages/`);
      setMessages(res.data);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  }, [thread]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Enviar mensagem
  const handleSend = async () => {
    if (!text.trim() || !thread) return;

    setLoading(true);

    try {
      const res = await api.post(`/threads/${thread.id}/messages/`, { text });

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
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto bg-white shadow rounded p-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 p-3 rounded-xl max-w-[70%] ${
              msg.sender ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
            }`}
          >
            {!msg.sender && <div className="text-sm font-bold mb-1">Chatbot</div>}
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded border"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite sua mensagem..."
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
