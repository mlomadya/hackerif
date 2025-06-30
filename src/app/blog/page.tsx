"use client";
import React from 'react';
import Image from "next/image";
import Link from 'next/link';

const posts = [
  {
    slug: "pentest-tips",
    title: "5 نصائح لاحتراف اختبار الاختراق",
    excerpt: "تعرف على أهم النصائح التي تساعدك في تطوير مهاراتك في اختبار الاختراق بشكل احترافي.",
    image: "/vercel.svg", // صورة موجودة
  },
  {
    slug: "cybersecurity-basics",
    title: "أساسيات الأمن السيبراني لكل مبتدئ",
    excerpt: "دليل مبسط لأهم المفاهيم والممارسات في مجال الأمن السيبراني للمبتدئين.",
    image: "/cyber-beginner.jpg", // صورة جديدة مرفوعة
  },
  {
    slug: "passwords-security",
    title: "كيفية إنشاء كلمات مرور قوية وآمنة",
    excerpt: "طرق وأدوات تساعدك على حماية حساباتك من الاختراق عبر كلمات مرور قوية.",
    image: "/window.svg", // صورة موجودة
  },
  {
    slug: "ai-in-ecommerce",
    title: "دور الذكاء الاصطناعي في التجارة الإلكترونية",
    excerpt: "كيف يغير الذكاء الاصطناعي مستقبل التسوق عبر الإنترنت ويزيد من كفاءة المتاجر الإلكترونية.",
    image: "/globe.svg", // صورة موجودة
  },
  {
    slug: "pentest-beginners",
    title: "دليل المبتدئين لاختبار الاختراق",
    excerpt: "تعلم أساسيات اختبار الاختراق، الأدوات، والمراحل الأساسية لتأمين الأنظمة واكتشاف الثغرات.",
    image: "/file.svg", // صورة أيقونة مناسبة موجودة
  },
];

export default function BlogPage() {
  return (
    <main className="container mx-auto py-10 rtl text-right animate-fadein">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 drop-shadow">مدونة تعليمية</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col hover:scale-105 transition-transform border-b-4 border-blue-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-lg">
            <Image src={post.image} alt={post.title} width={600} height={160} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="font-semibold text-xl mb-2 text-blue-700 dark:text-yellow-400">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-yellow-300 hover:underline mt-auto">اقرأ المزيد</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
