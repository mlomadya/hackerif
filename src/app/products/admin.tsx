"use client";

import React, { useState, useEffect } from "react";
import { products as productsData } from "./data";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export default function ProductsAdminPage() {
  // تحويل بيانات المنتجات إلى الشكل المطلوب مع id و price افتراضي
  const [products, setProducts] = useState<Product[]>(
    productsData.map((p, idx) => ({
      id: idx + 1,
      name: p.name,
      description: p.description,
      price: 0,
      category: p.category,
    }))
  );
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageUrl, setEditImageUrl] = useState<string>("");
  // إشعار مؤقت
  const [notif, setNotif] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  function showNotif(type: 'success' | 'error', msg: string) {
    setNotif({ type, msg });
    setTimeout(() => setNotif(null), 3000);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    // رفع الصورة مباشرة عند اختيارها
    const formData = new FormData();
    formData.append("file", file);
    setImageUrl("");
    showNotif('success', 'جاري رفع الصورة...');
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setImageUrl(data.url);
      showNotif('success', 'تم رفع الصورة بنجاح!');
    } else {
      showNotif('error', 'فشل رفع الصورة!');
    }
  };

  const handleEditImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImageFile(file);
    // رفع الصورة إلى /api/upload
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setEditImageUrl(data.url);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      showNotif('error', 'جميع الحقول مطلوبة');
      return;
    }
    const newProduct: Product = {
      id: Date.now(),
      name: form.name as string,
      description: form.description || "",
      price: Number(form.price),
      category: form.category as string,
      image: imageUrl,
    };
    setProducts([newProduct, ...products]);
    setForm({});
    setImageFile(null);
    setImageUrl("");
    setShowAdd(false);
    showNotif('success', 'تمت إضافة المنتج بنجاح!');
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setForm(product);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editId ? {
      ...p,
      ...form,
      price: Number(form.price),
      image: editImageUrl || p.image
    } : p));
    setEditId(null);
    setForm({});
    setEditImageFile(null);
    setEditImageUrl("");
    showNotif('success', 'تم تحديث المنتج بنجاح!');
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    showNotif('success', 'تم حذف المنتج بنجاح!');
  };

  // حماية: لا تظهر صفحة الإدارة إلا إذا كان المستخدم مسجلاً الدخول (مثال بسيط)
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <main className="container mx-auto py-10 rtl text-right">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 animate-fadein">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">إدارة المنتجات</h2>
        {notif && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white ${notif.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {notif.msg}
          </div>
        )}
        {showAdd && (
          <form className="space-y-4 mb-6" onSubmit={handleAdd}>
            <div>
              <label className="block mb-1 font-semibold">اسم المنتج</label>
              <input name="name" value={form.name || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">الوصف</label>
              <input name="description" value={form.description || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">السعر</label>
              <input name="price" type="number" value={form.price || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">التصنيف</label>
              <input name="category" value={form.category || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">صورة المنتج</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imageUrl && <img src={imageUrl} alt="صورة المنتج" className="mt-2 w-24 h-24 object-cover rounded" />}
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">إضافة</button>
              <button type="button" className="bg-gray-200 text-blue-600 px-6 py-2 rounded w-full" onClick={() => setShowAdd(false)}>إلغاء</button>
            </div>
          </form>
        )}
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-6" onClick={() => { setShowAdd(true); setEditId(null); setForm({}); }}>+ منتج جديد</button>
        <div className="divide-y">
          {products.map(product => (
            <div key={product.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              {editId === product.id ? (
                <form className="flex-1 flex flex-col md:flex-row gap-2" onSubmit={handleUpdate}>
                  <input name="name" value={form.name || ""} onChange={handleChange} className="border rounded px-2 py-1 w-32" required />
                  <input name="description" value={form.description || ""} onChange={handleChange} className="border rounded px-2 py-1 w-40" />
                  <input name="price" type="number" value={form.price || ""} onChange={handleChange} className="border rounded px-2 py-1 w-20" required />
                  <input name="category" value={form.category || ""} onChange={handleChange} className="border rounded px-2 py-1 w-24" required />
                  <input type="file" accept="image/*" onChange={handleEditImageChange} />
                  {(editImageUrl || product.image) && (
                    <img src={editImageUrl || product.image} alt="صورة المنتج" className="w-16 h-16 object-cover rounded" />
                  )}
                  <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">حفظ</button>
                  <button type="button" className="bg-gray-200 text-blue-600 px-3 py-1 rounded" onClick={() => setEditId(null)}>إلغاء</button>
                </form>
              ) : (
                <>
                  <div className="flex-1 flex flex-col md:flex-row gap-2">
                    <span className="font-semibold">{product.name}</span>
                    <span className="text-gray-500">{product.description}</span>
                    <span className="text-blue-700">{product.price} د.م</span>
                    <span className="text-gray-400">{product.category}</span>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(product)}>تعديل</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(product.id)}>حذف</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
