import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import { MessageSquare, Clock, Trash2 } from "lucide-react";

export default function History() {
  const { token } = useAuth();
  const [threads, setThreads] = useState([]);
  const [openThread, setOpenThread] = useState(null);
  const [messages, setMessages] = useState([]);

  // ------------------------------
  // Buscar todas as conversas
  // ------------------------------
  async function loadThreads() {
    try {
      const res = await api.get("/threads/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setThreads(res.data);
    } catch (err) {
      console.error("Erro ao buscar threads:", err);
    }
  }

  useEffect(() => {
    loadThreads();
  }, [token]);


  // ------------------------------
  // Expandir e carregar mensagens
  // ------------------------------
  async function loadMessages(threadId) {
    if (openThread === threadId) {
      setOpenThread(null);
      setMessages([]);
      return;
    }

    try {
      const res = await api.get(`/threads/${threadId}/messages/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ evita mostrar threads sem mensagens
      if (res.data.length === 0) return;

      setMessages(res.data);
      setOpenThread(threadId);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    }
  }


  // ------------------------------
  // Limpar histórico
  // ------------------------------
  async function handleClearHistory() {
    if (!confirm("Tem certeza que deseja apagar TODO o histórico?")) return;

    try {
      await api.delete("/threads/clear/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setThreads([]);
      setMessages([]);
      setOpenThread(null);
    } catch (err) {
      console.error("Erro ao limpar histórico:", err);
    }
  }


  return (
    <div className="flex h-screen bg-gradient-to-br from-brand-blue-dark via-brand-blue-light to-brand-blue-dark">

      <Sidebar active="history" />

      <div className="flex-1 p-8 overflow-y-auto">

        {/* Título + Botão limpar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-amber-50">
            <MessageSquare className="w-7 h-7 text-amber-50 bg" />
            Histórico de Conversas
          </h1>

          {threads.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <Trash2 size={18} />
              Limpar Histórico
            </button>
          )}
        </div>


        {/* Lista de Threads */}
        {threads.length === 0 ? (
          <p className="text-gray-500">Nenhuma conversa registrada ainda.</p>
        ) : (
          threads.map((t) => (
            <div
              key={t.id}
              className="bg-amber-50 border rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => loadMessages(t.id)}
            >
              <p className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare size={18} className="text-brand-blue-dark" />
                Conversa #{t.id}
              </p>

              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Clock size={14} />
                {new Date(t.created_at).toLocaleString()}
              </p>

              {/* Expansão das mensagens */}
              {openThread === t.id && (
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-2 my-1 rounded max-w-[70%] ${
                        m.sender
                          ? "bg-brand-blue text-white ml-auto"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {!m.sender && (
                        <div className="text-xs font-bold mb-1">Chatbot</div>
                      )}
                      {m.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
