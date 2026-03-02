import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/loginnRegister.css"

interface User {
  username: string;
  password: string;
  approved: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "", approved:false });

  const handleLogin = (e: any) => { // any is {Fromevent}
    e.preventDefault();
    // user data that on local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log("users" , users)
    
    // find user that match
    const found = users.find(
      (u: any) => u.username === user.username && u.password === user.password
    );

    console.log("Name + Pass" , found)

    if (found) {
      alert(`Welcome ${found.role}!`);

      // Change path
      localStorage.setItem("currentUser", JSON.stringify(found));

      if (found.role === "employee") navigate("/employee");
      else navigate("/customer");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="light login-container">
      <div className="login-box">
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="inputCustom"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="password"
            className="inputCustom"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <Link to="/register" className="login-link">
          No account? Register here
        </Link>

        {/* Debug (optional) */}
        <div className="debug-info">
          👤 {user.username} / 🔒 {user.password}
        </div>
      </div>
    </div>
  );
}