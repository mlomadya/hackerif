"use client";
import React from 'react';
import Link from 'next/link';

const posts = [
  {
    slug: "pentest-tips",
    title: "5 نصائح لاحتراف اختبار الاختراق",
    excerpt: "تعرف على أهم النصائح التي تساعدك في تطوير مهاراتك في اختبار الاختراق بشكل احترافي.",
    image: "/blog1.png",
  },
  {
    slug: "cybersecurity-basics",
    title: "أساسيات الأمن السيبراني لكل مبتدئ",
    excerpt: "دليل مبسط لأهم المفاهيم والممارسات في مجال الأمن السيبراني للمبتدئين.",
    image: "/blog2.png",
  },
  {
    slug: "passwords-security",
    title: "كيفية إنشاء كلمات مرور قوية وآمنة",
    excerpt: "طرق وأدوات تساعدك على حماية حساباتك من الاختراق عبر كلمات مرور قوية.",
    image: "/blog3.png",
  },
];

export default function BlogPage() {
  return (
    <main className="container mx-auto py-10 rtl text-right animate-fadein">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 drop-shadow">مدونة تعليمية</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col hover:scale-105 transition-transform border-b-4 border-blue-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="font-semibold text-xl mb-2 text-blue-700 dark:text-yellow-400">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-yellow-300 hover:underline mt-auto">اقرأ المزيد</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
