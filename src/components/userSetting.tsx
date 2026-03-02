import { useState } from "react";
import type { DataUserRegister } from "../data/dataTypesModel";
import "../styles/userSetting.css"

interface Props {
  user: DataUserRegister;
  onClose: () => void;
  darkMode: boolean;
}

export default function UserSetting({ user, onClose, darkMode }: Props) {
  const [form, setForm] = useState({
    username: user.username,
    password: user.password,
  });

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = users.map((u: any) =>
      u.username === user.username ? { ...u, ...form } : u
    );
    localStorage.setItem("users", JSON.stringify(updated));
    localStorage.setItem("currentUser", JSON.stringify({ ...user, ...form }));
    alert("Updated successfully!");
    onClose();
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const filtered = users.filter((u: any) => u.username !== user.username);
      localStorage.setItem("users", JSON.stringify(filtered));
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    }
  };

  return (
    <div className="user-setting-overlay">
      <div className={`user-setting-box ${darkMode ? "dark" : "light"}`}>
        <h2>⚙️ User Settings</h2>

        <input
          type="text"
          className="user-input"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          className="user-input"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="btn-row">
          <button onClick={handleSave} className="user-btn btn-save">
            💾 Save
          </button>
          <button onClick={handleDeleteAccount} className="user-btn btn-delete">
            🗑️ Delete
          </button>
        </div>

        <span onClick={onClose} className="user-close">
          ✖ Close
        </span>
      </div>
    </div>
  );
}