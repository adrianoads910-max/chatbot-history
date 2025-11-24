import api from "./api";


export async function listThreads() {
  const res = await api.get("/threads/");
  return res.data;
}
