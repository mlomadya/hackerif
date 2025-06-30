import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CartNavButton from "./components/CartNavButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "متجر إلكتروني عصري",
  description: "تسوق أفضل المنتجات والكتب بسهولة وواجهة عربية عصرية.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        {/* شريط العروض */}
        <div className="w-full bg-gradient-to-l from-blue-700 to-blue-400 text-white text-center py-3 px-2 font-bold tracking-wide animate-pulse shadow-md">
          🎉 عرض خاص: احصل على خصم 20% على جميع المنتجات باستخدام الكود <span className="bg-white text-blue-700 rounded px-2 py-1 mx-1 font-mono">CYBER20</span> لفترة محدودة!
        </div>
        <nav className="bg-white shadow mb-8 sticky top-0 z-30">
          <div className="container mx-auto px-4 py-3 flex gap-6 text-lg font-semibold rtl flex-row-reverse items-center">
            <Link href="/" className="relative bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" /></svg>
              <span className="font-bold">الرئيسية</span>
            </Link>
            <Link href="/products" className="relative bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" /></svg>
              <span className="font-bold">المنتجات</span>
            </Link>
            <Link href="/books" className="relative bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5zm0 0v-8" /></svg>
              <span className="font-bold">الكتب</span>
            </Link>
            {/* زر اتصل بنا تم حذفه */}
            {/* زر السلة بارز مع عداد */}
            <CartNavButton />
            <Link href="/profile" className="relative bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2 ml-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="font-bold">الملف الشخصي</span>
            </Link>
            <Link href="/blog" className="relative bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2-2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
              <span className="font-bold">مدونة</span>
            </Link>
          </div>
        </nav>
        <div className="container mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}
