import axios from 'axios';

// Se o backend roda em http://localhost:8000, usar proxy no package.json ou definir baseURL.
// Aqui usamos caminho relativo para facilitar (assumir mesmo host /api/)
const api = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
