import { useNavigate } from "react-router-dom";
import AvatarLogin from "../../components/AvatarLogin";
import { loginAs } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(username) {
    try {
      const tokens = await loginAs(username);

      login({
        access: tokens.access,
        username,
      });

      navigate("/chat");
    } catch {
      alert("Erro ao fazer login!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-16 
      bg-gradient-to-br from-brand-blue-dark via-brand-blue-light to-brand-blue-dark text-white">

      <h1 className="text-5xl font-extrabold drop-shadow-lg">
        Escolha seu Usuário
      </h1>

      <div className="flex gap-24">
        <AvatarLogin
          name="Usuário A"
          image="/avatarA.png"
          onClick={() => handleLogin("A")}
        />

        <AvatarLogin
          name="Usuário B"
          image="/avatarB.png"
          onClick={() => handleLogin("B")}
        />
      </div>
    </div>
  );
}
