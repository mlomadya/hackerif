"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { signOut } from "next-auth/react";

// نوع بيانات المستخدم
type User = {
  id: number;
  name?: string;
  email?: string;
  image?: string;
  bio?: string;
  phone?: string;
  createdAt: string;
  role?: string;
};

const AuthBox = dynamic(() => import("./AuthBox"), { ssr: false });

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", bio: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setForm({
          name: data.user?.name || "",
          phone: data.user?.phone || "",
          bio: data.user?.bio || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    let imageUrl = user?.image || "";
    // رفع الصورة إذا تم اختيارها
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.url) {
          imageUrl = uploadData.url;
        } else {
          setError("فشل رفع الصورة: " + (uploadData.error || ""));
          return;
        }
      } catch {
        setError("فشل رفع الصورة.");
        return;
      }
    }
    // تحديث بيانات المستخدم فعليًا
    try {
      const res = await fetch(`/api/users/${user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setSuccessMsg("تم تحديث البيانات بنجاح");
        setEditMode(false);
        setImagePreview(null);
        setImageFile(null);
      } else {
        setError(data.error || "حدث خطأ أثناء التحديث");
      }
      } catch {
      setError("حدث خطأ أثناء التحديث.");
    }
  };

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;
  if (!user) return <AuthBox />;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 text-right bg-gradient-to-br from-blue-50 to-white border border-blue-100">
      {error && <div className="text-center text-red-600 mb-4 font-bold animate-pulse">{error}</div>}
      {successMsg && <div className="text-center text-green-600 mb-4 font-bold animate-pulse">{successMsg}</div>}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 shadow-lg border-4 border-blue-200 rounded-full overflow-hidden">
          <Image
            src={imagePreview || user.image || "/default-avatar.png"}
            alt="صورة المستخدم"
            fill
            className="object-cover"
            sizes="128px"
            priority
          />
          {user.role === "admin" && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white">مدير</span>
          )}
        </div>
        {!editMode ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {user.name || "بدون اسم"}
              {user.role === "admin" && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">مدير</span>}
            </h2>
            <p className="text-gray-500 text-lg">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
                onClick={() => setEditMode(true)}
              >
                تعديل البيانات
              </button>
              <button
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow"
                onClick={() => signOut({ callbackUrl: "/profile" })}
              >
                تسجيل الخروج
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="w-full flex flex-col items-center gap-3 mt-2 animate-fade-in">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="الاسم"
              className="input input-bordered w-full text-right focus:ring-2 focus:ring-blue-400"
              dir="rtl"
              required
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="رقم الهاتف"
              className="input input-bordered w-full text-right focus:ring-2 focus:ring-blue-400"
              dir="rtl"
              pattern="[0-9]{10,15}"
              title="رقم هاتف صالح فقط"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="نبذة عنك"
              className="input input-bordered w-full text-right focus:ring-2 focus:ring-blue-400"
              rows={3}
              dir="rtl"
              maxLength={200}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 shadow"
              >
                حفظ
              </button>
              <button
                type="button"
                className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 shadow"
                onClick={() => { setEditMode(false); setImagePreview(null); }}
              >
                إلغاء
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="mt-8 space-y-3 bg-white/60 rounded-xl p-4 border border-blue-100 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <span className="font-semibold">رقم المستخدم:</span> <span>{user.id}</span>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <span className="font-semibold">الدور:</span> <span className={user.role==="admin"?"text-blue-700 font-bold":"text-gray-700"}>{user.role}</span>
        </div>
        {user.phone && (
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <span className="font-semibold">الهاتف:</span> <span dir="ltr">{user.phone}</span>
          </div>
        )}
        {user.bio && (
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <span className="font-semibold">نبذة:</span> <span>{user.bio}</span>
          </div>
        )}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <span className="font-semibold">تاريخ التسجيل:</span> <span>{new Date(user.createdAt).toLocaleDateString("ar-MA")}</span>
        </div>
      </div>
    </div>
  );
}
