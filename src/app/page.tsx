"use client";

import Image from "next/image";
import Link from "next/link";
import { books } from "./books/data";
import { products } from "./products/data";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-100 via-white to-green-50 overflow-hidden">
      {/* خلفية SVG عصرية */}
      <svg className="absolute top-0 left-0 w-[600px] h-[600px] opacity-20 -z-10" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="300" r="300" fill="url(#paint0_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 300) scale(300)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-10 -z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="400" rx="200" fill="url(#paint1_radial)" />
        <defs>
          <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(200)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </svg>
      {/* بانر ترحيبي مع شعار المتجر */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 bg-gradient-to-r from-blue-400 via-blue-200 to-cyan-100 mb-8 shadow rounded-b-3xl flex flex-col items-center justify-center"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-full shadow-2xl border-8 border-blue-400 p-2 flex items-center justify-center" style={{ boxShadow: '0 0 0 8px #fff, 0 8px 32px 0 rgba(59,130,246,0.15)' }}>
            <Image
              src="/uploads/1750960291956-ia7mue.png"
              alt="شعار المتجر"
              width={140}
              height={140}
              className="rounded-full"
              priority
            />
          </div>
        </div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          مرحباً بك في Hacker Rif Pro
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-blue-800 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          متجر إلكتروني متخصص في بيع أدوات، تطبيقات، وكتب تعليمية في مجال الأمن السيبراني واختبار الاختراق.
        </motion.p>
        <Link
          href="/products"
          className="inline-block bg-gradient-to-l from-blue-700 to-cyan-400 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-blue-800 hover:to-cyan-500 transition"
        >
          تصفح المنتجات
        </Link>
      </motion.section>

      {/* عرض مختصر للمنتجات مع حركة */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-900">منتجات مختارة</h2>
          <Link
            href="/products"
            className="text-cyan-700 hover:underline font-semibold"
          >
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.slug}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-start border-b-4 border-cyan-200 hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="mb-3 rounded"
              />
              <h3 className="font-semibold text-lg mb-1 text-blue-700">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-2 text-sm">
                {product.description}
              </p>
              <span className="text-blue-900 font-bold mb-2">
                {product.price} درهم
              </span>
              <Link
                href={`/products/${product.slug}`}
                className="text-blue-600 hover:underline mt-auto"
              >
                تفاصيل المنتج
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* عرض مختصر للكتب مع حركة */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-green-900">كتب تعليمية مختارة</h2>
          <Link
            href="/books"
            className="text-emerald-700 hover:underline font-semibold"
          >
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.slice(0, 3).map((book, i) => (
            <motion.div
              key={book.slug}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-start border-b-4 border-emerald-200 hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <Image
                src={book.image}
                alt={book.name}
                width={80}
                height={80}
                className="mb-3 rounded"
              />
              <h3 className="font-semibold text-lg mb-1 text-green-700">
                {book.name}
              </h3>
              <p className="text-gray-600 mb-2 text-sm">
                {book.description}
              </p>
              <span className="text-green-900 font-bold mb-2">
                {book.price} درهم
              </span>
              <Link
                href={`/books/${book.slug}`}
                className="text-green-600 hover:underline mt-auto"
              >
                تفاصيل الكتاب
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* قسم المميزات مع حركة */}
      <section className="container mx-auto px-4 py-8">
        <motion.h2
          className="text-2xl font-bold text-blue-900 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          لماذا تختار Hacker Rif Pro؟
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <motion.div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-blue-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/secure.svg"
              alt="أمان عالي"
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <h3 className="font-semibold text-lg mb-1">أمان عالي</h3>
            <p className="text-gray-600 text-sm">
              جميع المنتجات والكتب مختارة بعناية لضمان الجودة والأمان.
            </p>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-emerald-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Image
              src="/support.svg"
              alt="دعم فني"
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <h3 className="font-semibold text-lg mb-1">دعم فني سريع</h3>
            <p className="text-gray-600 text-sm">
              فريقنا جاهز لمساعدتك في أي وقت عبر وسائل التواصل.
            </p>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-cyan-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image
              src="/delivery.svg"
              alt="توصيل سريع"
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <h3 className="font-semibold text-lg mb-1">توصيل سريع وآمن</h3>
            <p className="text-gray-600 text-sm">
              خدمة توصيل رقمية فورية للمنتجات والكتب بعد الشراء.
            </p>
          </motion.div>
        </div>
      </section>

      {/* تذييل */}
      <footer className="bg-gradient-to-r from-blue-900 to-cyan-700 text-white py-8 mt-12 text-center rounded-t-3xl shadow-lg">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://t.me/hacker_rif_pro" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
            <svg className="w-7 h-7 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M9.036 16.498l-.398 3.934c.57 0 .818-.244 1.116-.537l2.675-2.56 5.547 4.05c1.016.56 1.74.266 1.99-.94l3.61-16.84c.33-1.55-.563-2.16-1.56-1.79L2.16 9.36c-1.53.6-1.51 1.46-.26 1.85l4.6 1.44 10.68-6.74c.5-.32.96-.14.58.2"/></svg>
          </a>
          <a href="https://facebook.com/your_facebook" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
            <svg className="w-7 h-7 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
          </a>
          <a href="https://instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
            <svg className="w-7 h-7 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.98.98-1.263 2.092-1.322 3.373C2.013 5.741 2 6.15 2 12c0 5.85.013 6.259.072 7.539.059 1.281.342 2.393 1.322 3.373.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.98-.98 1.263-2.092 1.322-3.373.059-1.28.072-1.689.072-7.539 0-5.85-.013-6.259-.072-7.539-.059-1.281-.342-2.393-1.322-3.373-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
          </a>
        </div>
        <p>
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} Hacker Rif Pro
        </p>
      </footer>
    </div>
  );
}
