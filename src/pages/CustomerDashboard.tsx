import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DataPackageItem, DataUserRegister } from "../data/dataTypesModel.ts";
import packageData from "../data/dataPackageItem.json";
import UserSetting from "../components/userSetting.tsx";
import "../styles/card.css";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<DataPackageItem[]>([]);
  const [user, setUser] = useState<DataUserRegister | null>(null);
  const [showSetting, setShowSetting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // token remembred mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);
  // switch mode
    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);


    // setting user
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (!currentUser) {
          navigate("/");
          return;
        }
        setUser(currentUser);
        // Load item that published
        const publishedItems = (packageData as DataPackageItem[]).filter(
          (item) => item.published === true
        );
        setPackages(publishedItems);
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("currentUser");
      navigate("/");
    };

    

  return (
    <div 
    className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 
    dark:text-gray-100 transition-colors duration-500">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">🎁 Product Showcase</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <main>
        {packages.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "gray" }}>
            No published items yet.
          </p>
        ) : (
          <div className="card-grid">
            {packages.map((item) => (
              <div key={item.id} className="card">
                <div className="card-icon">{item.icon}</div>
                <h3 className="card-title">{item.name}</h3>
                <p className="card-price">💰 ${item.price}</p>
                <p className="card-date">
                  {new Date(item.createDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <div style={{
        display:"grid",
        gridTemplateColumns:"auto auto auto auto",
        gridGap: "10px",
        padding: "10px",

      }}>
        <div></div>
        <button
            onClick={() => setShowSetting(true)}
            className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            ⚙️ Profile Setting
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
          <div></div>
      </div>

      {showSetting && user && (
        <UserSetting
          user={user}
          onClose={() => setShowSetting(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}