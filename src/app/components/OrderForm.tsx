"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function OrderForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", products: defaultProduct });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // تحويل المنتجات إلى روابط فقط وإرسالها في خانة المنتجات
      let productLinks = "";
      if (form.products) {
        productLinks = form.products
          .split(/,|\n/)
          .map((p) => p.trim())
          .filter(Boolean)
          .map((p) => {
            // استخراج الكمية إذا كانت موجودة (مثال: "اسم المنتج (x2)")
            const match = p.match(/^(.*?)(?:\s*\(x(\d+)\))?$/i);
            const name = match ? match[1].trim() : p;
            const qty = match && match[2] ? Number(match[2]) : 1;
            const slug = encodeURIComponent(name.replace(/\s+/g, '-'));
            return `• ${name} (الكمية: ${qty})\n  https://hacker-rif.com/products/${slug}`;
          })
          .join('\n\n');
      }
      const emailParams = {
        name: form.name,
        phone: form.phone,
        products: productLinks, // المنتجات = روابط مع اسم المنتج والكمية
        to_email: "unbohack@proton.me",
      };
      await emailjs.send(
        "service_qjkst1l", // Service ID
        "template_e3mjvfr", // Template ID الصحيح
        emailParams,
        "H4iDCEaokbieZgIte" // Public Key
      );
      setMessage("سيتم التواصل معك قريباً لتأكيد الطلب. شكراً لثقتك بنا!");
      setForm({ name: "", phone: "", products: "" });
    } catch (err) {
      console.log("EmailJS error:", err);
      setMessage("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى. التفاصيل في الكونسول.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 rtl text-right">
      <h2 className="text-xl font-bold mb-2 text-blue-700">طلب جديد</h2>
      {message && (
        <div className="mb-2 text-center px-4 py-3 rounded-lg shadow bg-green-100 border border-green-300 text-green-800 font-semibold animate-fadein">
          {message}
        </div>
      )}
      <input
        type="text"
        name="name"
        placeholder="الاسم الكامل"
        value={form.name}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="tel"
        name="phone"
        placeholder="رقم الهاتف"
        value={form.phone}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
      />
      <textarea
        name="products"
        placeholder="تفاصيل الطلب أو المنتجات المطلوبة"
        value={form.products}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 min-h-[80px]"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-bold"
      >
        {loading ? "...جاري الإرسال" : "إرسال الطلب"}
      </button>
    </form>
  );
}
