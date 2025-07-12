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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg flex flex-col gap-5 rtl text-right border border-zinc-100 dark:border-zinc-800 transition-colors"
      style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.07)' }}
    >
      <h2 className="text-2xl font-extrabold mb-2 text-blue-700 dark:text-blue-400 flex items-center gap-2 justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z"/></svg>
        طلب جديد
      </h2>
      {message && (
        <div className={`mb-2 text-center px-4 py-3 rounded-lg shadow border font-semibold animate-fadein ${message.includes('خطأ')
          ? 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
          : 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-700'}`}
        >
          {message}
        </div>
      )}
      {/* حقل الاسم */}
      <div className="relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-7 8.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-.5c0-2.485-4.03-4.5-9-4.5s-9 2.015-9 4.5Z"/></svg>
        </span>
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg pr-10 pl-3 py-3 focus:ring-2 focus:ring-blue-300 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base transition"
        />
      </div>
      {/* حقل الهاتف */}
      <div className="relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"/></svg>
        </span>
        <input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg pr-10 pl-3 py-3 focus:ring-2 focus:ring-blue-300 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base transition"
        />
      </div>
      {/* حقل المنتجات */}
      <div className="relative">
        <span className="absolute right-3 top-4 text-blue-500">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7.24V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.24a2 2 0 0 0 .553 1.39l7 7.45a2 2 0 0 0 2.894 0l7-7.45A2 2 0 0 0 21 7.24ZM5 8.76V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.76l-6.553 6.97a4 4 0 0 1-5.894 0L5 8.76Z"/></svg>
        </span>
        <textarea
          name="products"
          placeholder="تفاصيل الطلب أو المنتجات المطلوبة"
          value={form.products}
          onChange={handleChange}
          required
          className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg pr-10 pl-3 py-3 focus:ring-2 focus:ring-blue-300 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base min-h-[90px] transition"
        />
      </div>
      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={loading}
        className="relative flex items-center justify-center gap-2 bg-gradient-to-l from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 text-white py-3 rounded-lg hover:scale-[1.03] hover:shadow-lg transition font-bold text-lg shadow-blue-100 dark:shadow-blue-900 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && (
          <span className="animate-spin inline-block mr-2">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30"/><path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
          </span>
        )}
        {loading ? "جاري الإرسال..." : "إرسال الطلب"}
      </button>
      <style jsx>{`
        .animate-fadein {
          animation: fadein 0.7s;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </form>
  );
}
