import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.success) {
      alert("Login successful!");
      navigate("/");  // Redirect to home
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="auth-page" style={{ background: "linear-gradient(135deg, #FFFFFF, #0C2340)" }}>
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="auth-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
