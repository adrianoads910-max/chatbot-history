import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export async function loginAs(username) {
  const password = "123456";

  const res = await axios.post(`${API}/token/`, {
    username,
    password,
  });

  // salva token no localStorage (necessário para o interceptor funcionar)
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
}
