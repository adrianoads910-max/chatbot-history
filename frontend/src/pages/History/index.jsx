import { useEffect, useState } from "react";
import api from "../../api/api";


export default function History() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    api.get("/threads/").then((res) => setThreads(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Histórico de Conversas</h1>

      {threads.map((t) => (
        <div key={t.id} className="p-4 border rounded mb-3">
          <p className="font-bold">Thread #{t.id}</p>
          <p className="text-gray-600">{t.created_at}</p>
        </div>
      ))}
    </div>
  );
}
