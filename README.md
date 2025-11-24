
---

# 💬 Chat App – Django + React

Aplicação Full-Stack composta por:

✅ **Backend Django + Django REST Framework + JWT**
✅ **Frontend React + Tailwind + Axios + Context API**
✅ **Chat com histórico, threads, respostas automáticas e autenticação**

Projeto desenvolvido para demonstrar arquitetura limpa, boas práticas, componentização e integração entre frontend e backend.

---

## 🚀 1. Requisitos

* Python **3.10+**
* Node.js **18+**
* npm ou yarn
* PostgreSQL (ou SQLite para testes)

---

## 📦 2. Clonar o projeto

```bash
git clone https://github.com/seu-repo/chat-app.git
cd chat-app
```

---

## 🛠 3. Backend (Django)

### ▶️ Entrar na pasta

```bash
cd backend
```

### 📥 Criar ambiente virtual

```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```

### 📦 Instalar dependências

```bash
pip install -r requirements.txt
```
### 🗂 Rodar migrações

```bash
python manage.py migrate
```

### ▶️ Iniciar servidor

```bash
python manage.py runserver
```

✅ API disponível em:
`http://127.0.0.1:8000/api/`

---

## 💻 4. Frontend (React)

### ▶️ Entrar na pasta

```bash
cd frontend
```

### 📦 Instalar dependências

```bash
npm install
```

### ▶️ Rodar app

```bash
npm run dev
```

✅ Frontend disponível em:
`http://localhost:5173`

---

## 🔑 5. Login de Teste

O projeto já possui login rápido via token mockado — basta escolher:

* **Usuário A**
* **Usuário B**

Cada usuário recebe respostas de chatbot personalizadas.

---

## 🧠 Decisões Técnicas

### ✅ **Backend**

* **Thread separa conversas por usuário**

  * `Thread` é criada somente quando o usuário envia a 1ª mensagem
* **Message armazena cada mensagem**

  * Relacionamento 1-N com Thread
* **Chatbot simulado**

  * Resposta mock no backend, mas pronto para IA real futuramente
* **JWT Authentication**

  * Segurança simples e escalável
* **View baseada em ListCreateAPIView**

  * Permite listar mensagens e criar novas na mesma rota

### ✅ **Frontend**

* **React + Hooks + Context API**

  * Gerenciamento global de autenticação
* **Axios com interceptor**

  * Injeta token em todas as requisições
* **Componentização**

  * Sidebar, AvatarLogin, Chat, History separados
* **useRef evita criação duplicada de threads**

  * Problema comum no React Strict Mode
* **Tailwind**

  * Agilidade + consistência visual

### ✅ **UX**

* Sidebar persistente
* Botão de limpar histórico
* Expansão de mensagens no histórico
* Avatares e ícones para navegação intuitiva

---

## 📂 Estrutura de Pastas

```
backend/
 ├── chat/
 │    ├── models.py
 │    ├── views.py
 │    ├── serializers.py
 │    └── urls.py
 └── config/
frontend/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── api/
 │    ├── context/
 │    └── App.jsx
```

---

## ✅ Endpoints Principais

| Método | Rota                         | Descrição       |
| ------ | ---------------------------- | --------------- |
| POST   | `/api/token/`                | Login           |
| GET    | `/api/threads/`              | Lista conversas |
| POST   | `/api/threads/`              | Cria thread     |
| GET    | `/api/threads/:id/messages/` | Lista mensagens |
| POST   | `/api/threads/:id/messages/` | Envia mensagem  |
| DELETE | `/api/threads/clear/`        | Limpa histórico |


---

## 👨‍💻 Autor

Adriano ADS 🔗 GitHub: https://github.com/adrianoads910-max

---
