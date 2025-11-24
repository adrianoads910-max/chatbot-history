import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MessageSquare, History, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const avatar = user === "A" ? "/avatarA.png" : "/avatarB.png";

  return (
    <aside className="w-64 bg-brand-blue-dark shadow-lg p-6 flex flex-col">
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
      <nav className="flex flex-col gap-4">
        <Link
          to="/chat"
          className={`flex items-center gap-3 px-4 py-2 rounded text-center ${
            location.pathname === "/chat"
              ? "bg-brand-blue-light text-white"
              : "bg-brand-gray hover:bg-blue-100"
          }`}
        >
          <MessageSquare size={20} />
          Chat
        </Link>

        <Link
          to="/history"
          className={`flex items-center gap-3 px-4 py-2 rounded text-center ${
            location.pathname === "/history"
              ? "bg-brand-blue-light text-white"
              : "bg-brand-gray hover:bg-blue-100"
          }`}
        >
          <History size={20} />
          Histórico
        </Link>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-130 flex items-center gap-3 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
