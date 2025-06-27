"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { messages } from './messages';
import { products } from './data';
import Image from "next/image";
import { getCart, setCart } from '../lib/cartStorage';

interface Product {
  slug: string;
  name: string;
  description: string;
  image: string;
  details: string;
  category: string;
  price: number;
}

export default function ProductsPage() {
  // تحديد اللغة من المسار
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const t = messages[locale];

  const categories = [
    t.all,
    ...Array.from(new Set(products.map((p) => p.category)))
  ];

  const [selected, setSelected] = useState(t.all);
  const [cart, setCartState] = useState<{ slug: string; quantity: number }[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const filtered = selected === t.all ? products : products.filter((p) => p.category === selected);

  // إضافة للسلة باستخدام localStorage
  const addToCart = (slug: string) => {
    const product = products.find((p) => p.slug === slug);
    if (!product) return;
    let currentCart = getCart();
    const exists = currentCart.find((item: any) => item.slug === slug);
    if (exists) {
      currentCart = currentCart.map((item: any) =>
        item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      currentCart = [...currentCart, { slug, quantity: 1 }];
    }
    setCart(currentCart);
    setCartState(currentCart);
    setMessage(t.added);
    setTimeout(() => setMessage(null), 1000);
  };

  // جلب السلة من localStorage عند التحميل
  useEffect(() => {
    setCartState(getCart());
  }, []);

  const goToCart = () => {
    router.push(`/${locale}/cart`);
  };

  return (
    <main className="container mx-auto py-10 rtl text-right">
      <h1 className="text-3xl font-bold mb-6">{t.products}</h1>
      <div className="flex gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded border ${selected === cat ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} transition`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={goToCart}
          className="px-4 py-2 rounded bg-green-600 text-white ml-auto"
        >
          {t.cart} ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </div>
      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center animate-fadein">
          {message}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <div
            key={product.slug}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-5 flex flex-col items-center border border-zinc-100 dark:border-zinc-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fadein group"
          >
            <Image
              src={product.image || "/placeholder-product.png"}
              alt={product.name}
              width={112}
              height={112}
              className="w-28 h-28 object-contain mb-4 rounded-xl border border-zinc-200 dark:border-zinc-700 group-hover:rotate-2 group-hover:scale-110 transition-all"
            />
            <h2 className="font-bold text-lg mb-1 text-blue-700 dark:text-blue-300 text-center">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 text-center line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 font-bold">
                {product.price} {locale === 'ar' ? 'د.م' : 'MAD'}
              </span>
              {product.category && (
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded px-2 py-0.5 text-xs">{product.category}</span>
              )}
            </div>
            <button
              onClick={() => addToCart(product.slug)}
              className="mt-2 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow group-hover:scale-105"
            >
              {t.addToCart}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
