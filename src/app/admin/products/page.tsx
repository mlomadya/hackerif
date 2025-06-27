"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  image?: string;
  price: number;
  description?: string;
};

const initialForm = { name: "", price: 0, image: "", description: "" };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError("حدث خطأ أثناء جلب المنتجات");
        setLoading(false);
      });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openAddForm() {
    setForm(initialForm);
    setEditId(null);
    setShowForm(true);
  }

  function openEditForm(product: Product) {
    setForm({ name: product.name, price: product.price, image: product.image || "", description: product.description || "" });
    setEditId(product.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/products/${editId}` : "/api/products";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    fetchProducts();
  }

  async function handleDelete(id: number) {
    if (!confirm("هل أنت متأكد من حذف المنتج؟")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  if (loading) return <div className="text-center py-10">جاري تحميل المنتجات...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6 text-right">
      <h1 className="text-2xl font-bold mb-6">إدارة المنتجات</h1>
      <button onClick={openAddForm} className="mb-4 px-4 py-2 bg-green-600 text-white rounded">+ إضافة منتج</button>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">الصورة</th>
            <th className="p-2">العنوان</th>
            <th className="p-2">السعر</th>
            <th className="p-2">الوصف</th>
            <th className="p-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={product.id} className="border-b">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">
                <Image src={product.image || "/default-avatar.png"} alt={product.name} width={50} height={50} className="rounded" />
              </td>
              <td className="p-2 font-semibold">{product.name}</td>
              <td className="p-2">
                <InlineEdit
                  value={product.price}
                  onSave={async (val) => {
                    await fetch(`/api/products/${product.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...product, price: Number(val) }),
                    });
                    fetchProducts();
                  }}
                  type="number"
                />
                د.م
              </td>
              <td className="p-2">
                <InlineEdit
                  value={product.description || ""}
                  onSave={async (val) => {
                    await fetch(`/api/products/${product.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...product, description: val }),
                    });
                    fetchProducts();
                  }}
                  type="text"
                />
              </td>
              <td className="p-2">
                <button className="px-2 py-1 bg-blue-600 text-white rounded mx-1" onClick={() => openEditForm(product)}>تعديل</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded mx-1" onClick={() => handleDelete(product.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md text-right space-y-4 shadow-lg">
            <h2 className="text-xl font-bold mb-2">{editId ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInput}
              placeholder="اسم المنتج"
              className="input input-bordered w-full text-right"
              dir="rtl"
              required
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInput}
              placeholder="السعر"
              className="input input-bordered w-full text-right"
              dir="rtl"
              required
            />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleInput}
              placeholder="رابط الصورة (اختياري)"
              className="input input-bordered w-full text-right"
              dir="rtl"
            />
            <input
              type="text"
              name="description"
              value={form.description || ""}
              onChange={handleInput}
              placeholder="وصف المنتج"
              className="input input-bordered w-full text-right"
              dir="rtl"
              required
            />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="px-4 py-1 bg-green-600 text-white rounded">حفظ</button>
              <button type="button" className="px-4 py-1 bg-gray-400 text-white rounded" onClick={() => setShowForm(false)}>إلغاء</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// مكون تحرير مضمن (inline edit)
function InlineEdit({ value, onSave, type = "text" }: { value: string | number, onSave: (val: string) => void, type?: string }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  useEffect(() => { setVal(value); }, [value]);
  return editing ? (
    <form
      onSubmit={e => { e.preventDefault(); onSave(val.toString()); setEditing(false); }}
      className="inline"
    >
      <input
        type={type}
        value={val}
        onChange={e => setVal(type === "number" ? Number(e.target.value) : e.target.value)}
        className="border rounded px-1 w-20 text-right"
        autoFocus
        onBlur={() => setEditing(false)}
      />
    </form>
  ) : (
    <span onClick={() => setEditing(true)} className="cursor-pointer hover:underline">
      {value}
    </span>
  );
}
