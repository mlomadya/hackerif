"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthBox() {
  const [mode, setMode] = useState<'login'|'register'>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (mode === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.");
        setMode("login");
      } else {
        setError(data.error || "حدث خطأ أثناء التسجيل");
      }
    } else {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false
      });
      if (res?.ok) {
        setSuccess("تم تسجيل الدخول بنجاح!");
        window.location.href = "/profile";
      } else {
        setError(res?.error || "بيانات الدخول غير صحيحة");
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 border rounded-xl p-6 max-w-md mx-auto mt-8 text-right">
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-1 rounded ${mode==="login"?"bg-blue-600 text-white":"bg-gray-200"}`}
          onClick={()=>setMode("login")}
        >دخول</button>
        <button
          className={`px-4 py-1 rounded ${mode==="register"?"bg-blue-600 text-white":"bg-gray-200"}`}
          onClick={()=>setMode("register")}
        >تسجيل</button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode==="register" && (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="الاسم الكامل"
            className="input input-bordered w-full text-right"
            dir="rtl"
            required
          />
        )}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="البريد الإلكتروني"
          className="input input-bordered w-full text-right"
          dir="rtl"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="كلمة المرور"
          className="input input-bordered w-full text-right"
          dir="rtl"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2"
          disabled={loading}
        >{loading ? "...جاري المعالجة" : mode==="login"?"دخول":"تسجيل"}</button>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        {success && <div className="text-green-600 text-center mt-2">{success}</div>}
      </form>
    </div>
  );
}
