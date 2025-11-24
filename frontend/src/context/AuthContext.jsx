import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

const login = ({ access, username }) => {
  localStorage.setItem("access", access);
  setToken(access);
  setUser(username);
};

const logout = () => {
  localStorage.removeItem("access");
  setToken(null);
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
