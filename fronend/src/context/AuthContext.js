import { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (loggedUser && token) {
      setUser(JSON.parse(loggedUser));
      setAuthToken(token);
    }
    setLoading(false); // ✅ Finish loading
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthToken(token);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post("/auth/register", { name, email, password });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
