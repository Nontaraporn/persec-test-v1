import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductManager from "../components/ProductManager";
import UserManager from "../components/UserManager";
import "../styles/dashboard.css";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"products" | "users">("products");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>🧑‍💼 Employee Dashboard</h2>
        <div className="nav-buttons">
          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            📦 Products
          </button>
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            👥 Users
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        {activeTab === "products" ? (
          <ProductManager currentUser={currentUser} />
        ) : (
          <UserManager />
        )}
      </main>
    </div>
  );
}