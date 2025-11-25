import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MessageSquare, History, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const avatar = user === "A" ? "/avatarA.png" : "/avatarB.png";

  return (
    <aside className="w-64 bg-slate-900 shadow-lg p-6 flex flex-col">
      {/* Avatar do usuário */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border mb-3 bg-amber-50 border-brand-gray"
        />
        <p className="font-bold text-amber-50 text-lg">Usuário {user}</p>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-4 flex-1">
        <Link
          to="/chat"
          className={`flex items-center gap-3 px-4 py-2 rounded ${
            location.pathname === "/chat"
              ? "bg-green-300 text-black"
              : "bg-brand-gray hover:bg-blue-100 text-black"
          }`}
        >
          <MessageSquare size={20} />
          Chat
        </Link>

        <Link
          to="/history"
          className={`flex items-center gap-3 px-4 py-2 rounded ${
            location.pathname === "/history"
              ? "bg-amber-300 text-black"
              : "bg-brand-gray hover:bg-blue-100 text-black"
          }`}
        >
          <History size={20} />
          Histórico
        </Link>

        {/* Empurra o logout para o final */}
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-auto flex items-center gap-3 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
