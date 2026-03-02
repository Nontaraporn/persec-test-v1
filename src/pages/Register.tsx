import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/loginnRegister.css"

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "customer",
  });

  const handleRegister = (e: any) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u: any) => u.username === form.username);

    if (exists) {
      alert("Username already exists");
      return;
    }

    const newUser = { ...form, id: Date.now(), approved: false };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    navigate("/");
  };

  return (
    <div className="light login-container">
      <div className="login-box">
        <h2>📝 Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="inputCustom"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            className="inputCustom"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="selectCustom"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
          </select>
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <Link to="/" className="auth-link">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
}