import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await register(name, email, password);
    if (response.success) {
      alert("Registration successful! Please login.");
      navigate("/login");  // Redirect to login
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="auth-page" style={{ background: "linear-gradient(135deg, #FFFFFF, #0C2340)" }}>
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="auth-btn" type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
