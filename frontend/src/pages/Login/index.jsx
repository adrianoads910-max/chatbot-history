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
    <div className="flex flex-col items-center justify-center h-screen gap-10 bg-brand-blue-light">
      <h1 className="text-3xl font-bold text-brand-gray">Escolha seu usuário</h1>

      <div className="flex gap-16">
        <AvatarLogin
          name="Usuário A"
          image="/avatarA.png"
          onClick={() => handleLogin("A")}
          className="bg-amber-50"
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
