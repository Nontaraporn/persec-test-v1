import { useEffect, useState } from "react";

interface User {
  username: string;
  password: string;
  role: string;
  id: number;
  approved: boolean;
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(data);
  }, []);

  const updateUser = (index: number, field: string, value: any) => {
    const updated = [...users];
    (updated[index] as any)[field] = value;
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const toggleApproved = (index: number) => {
    const updated = [...users];
    updated[index].approved = !updated[index].approved;
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className="manager-container">
      <h3>👥 User Management</h3>

      <table className="manager-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td>
                <input
                  value={u.username}
                  onChange={(e) => updateUser(i, "username", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={u.password}
                  onChange={(e) => updateUser(i, "password", e.target.value)}
                />
              </td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateUser(i, "role", e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="employee">Employee</option>
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={u.approved}
                  onChange={() => toggleApproved(i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}