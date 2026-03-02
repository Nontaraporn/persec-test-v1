import { useEffect, useState } from "react";
import packageData from "../data/dataPackageItem.json";

interface Product {
  id: number;
  name: string;
  price: number;
  icon: string;
  createDate: string;
  createdBy: string;
  published: boolean;
}

export default function ProductManager({ currentUser }: { currentUser: any }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    icon: "",
    published: false,
  });

  useEffect(() => {
    try {
        const saved = JSON.parse(localStorage.getItem("products") || "null");
        if (!saved || saved.length === 0) {
        console.log("📦 Loading default packageData...");
        setProducts(packageData);
        localStorage.setItem("products", JSON.stringify(packageData));
        } else {
        console.log("✅ Loaded products from localStorage:", saved);
        setProducts(saved);
        }
    } catch (err) {
        console.error("❌ Failed to load products:", err);
        setProducts(packageData);
    }
    }, []);

  // บันทึกลง localStorage ทุกครั้งที่มีการเปลี่ยน
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return alert("Please enter product name.");

    if (form.id) {
      // update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === form.id
            ? { ...p, ...form, createDate: new Date().toISOString(), createdBy: currentUser.username }
            : p
        )
      );
      alert("✅ Updated successfully!");
    } else {
      // add
      const newProduct: Product = {
        id: Date.now(),
        name: form.name!,
        price: Number(form.price),
        icon: form.icon || "📦",
        createDate: new Date().toISOString(),
        createdBy: currentUser?.username || "Unknown",
        published: form.published || false,
      };
      setProducts((prev) => [...prev, newProduct]);
      alert("✅ Added new product!");
    }
    setForm({ name: "", price: 0, icon: "", published: false });
  };

  const handleEdit = (product: Product) => setForm(product);

  const handleDelete = (id: number) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const togglePublish = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  return (
    <div className="manager-container">
      <h3>📦 Product Management</h3>

      <form className="manager-form" onSubmit={handleAddOrUpdate}>
        <input
          placeholder="Name"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price || ""}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
        />
        <input
          placeholder="Icon (e.g. 🎁)"
          value={form.icon || ""}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <table className="manager-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Price</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.icon}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>
                <input
                  type="checkbox"
                  checked={p.published}
                  onChange={() => togglePublish(p.id)}
                />
              </td>
              <td>
                <button onClick={() => handleEdit(p)}>✏️</button>
                <button onClick={() => handleDelete(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}