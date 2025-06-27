"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type User = {
  id: number;
  name?: string;
  email?: string;
  image?: string;
  bio?: string;
  phone?: string;
  createdAt: string;
};

const initialForm = { name: "", email: "", image: "", bio: "", phone: "" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => {
        setError("حدث خطأ أثناء جلب المستخدمين");
        setLoading(false);
      });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openEditForm(user: User) {
    setForm({
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
      bio: user.bio || "",
      phone: user.phone || "",
    });
    setEditId(user.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    await fetch(`/api/users/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    fetchUsers();
  }

  async function handleDelete(id: number) {
    if (!confirm("هل أنت متأكد من حذف المستخدم؟")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  if (loading) return <div className="text-center py-10">جاري تحميل المستخدمين...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6 text-right">
      <h1 className="text-2xl font-bold mb-6">إدارة المستخدمين</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">الصورة</th>
            <th className="p-2">الاسم</th>
            <th className="p-2">البريد</th>
            <th className="p-2">الهاتف</th>
            <th className="p-2">النبذة</th>
            <th className="p-2">تاريخ التسجيل</th>
            <th className="p-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">
                <Image src={user.image || "/default-avatar.png"} alt={user.name || "مستخدم"} width={40} height={40} className="rounded-full" />
              </td>
              <td className="p-2 font-semibold">{user.name || "-"}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.phone || "-"}</td>
              <td className="p-2">{user.bio || "-"}</td>
              <td className="p-2">{new Date(user.createdAt).toLocaleDateString("ar-MA")}</td>
              <td className="p-2">
                <button className="px-2 py-1 bg-blue-600 text-white rounded mx-1" onClick={() => openEditForm(user)}>تعديل</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded mx-1" onClick={() => handleDelete(user.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md text-right space-y-4 shadow-lg">
            <h2 className="text-xl font-bold mb-2">تعديل المستخدم</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInput}
              placeholder="اسم المستخدم"
              className="input input-bordered w-full text-right"
              dir="rtl"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              placeholder="البريد الإلكتروني"
              className="input input-bordered w-full text-right"
              dir="rtl"
              required
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleInput}
              placeholder="رقم الهاتف"
              className="input input-bordered w-full text-right"
              dir="rtl"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleInput}
              placeholder="نبذة عن المستخدم"
              className="input input-bordered w-full text-right"
              rows={2}
              dir="rtl"
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
