import React from 'react';

export default function ContactPage() {
  return (
    <main className="container mx-auto py-10 rtl text-right">
      <h1 className="text-3xl font-bold mb-6">تواصل معنا</h1>
      <form className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto space-y-4">
        <div>
          <label className="block mb-1 font-semibold">الاسم</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="اسمك الكامل" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">البريد الإلكتروني</label>
          <input type="email" className="w-full border rounded px-3 py-2" placeholder="example@email.com" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">رسالتك</label>
          <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="اكتب رسالتك هنا..."></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">إرسال</button>
      </form>
    </main>
  );
}
