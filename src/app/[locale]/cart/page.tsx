"use client";

import React, { useState, useEffect } from "react";
import { products } from "../../products/productsData";
import Link from "next/link";
import { getCart, setCart as setCartLS } from "../../lib/cartStorage";

export default function CartPage() {
  const [cart, setCartState] = useState<{ slug: string; quantity: number }[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const setCart = (cart: { slug: string; quantity: number }[]) => {
    setCartState(cart);
    setCartLS(cart);
  };
  // جلب السلة من localStorage عند التحميل
  useEffect(() => {
    setCartState(getCart());
  }, []);

  const removeFromCart = (slug: string) => {
    const updated = cart.filter((item) => item.slug !== slug);
    setCart(updated);
  };

  const updateQuantity = (slug: string, quantity: number) => {
    const updated = cart.map((item) =>
      item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updated);
  };
interface CartProduct {
  slug: string;
  name: string;
  description: string;
  image: string;
  details: string;
  category: string;
  price: number;
  quantity: number;
}

  const cartProducts = cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as CartProduct[];

  const totalPrice = cartProducts.reduce((sum, product: CartProduct) => sum + (product.price * product.quantity), 0);

  return (
    <main className="container mx-auto py-10 rtl text-right">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 animate-fadein">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">سلة المشتريات</h1>
        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center animate-fadein">{message}</div>
        )}
        {cartProducts.length === 0 ? (
          <div className="text-gray-500 text-center mb-6">سلتك فارغة حالياً.</div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartProducts.map((product: CartProduct) => (
                <div key={product.slug} className="flex items-center gap-4 border-b pb-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-gray-500 text-sm">{product.description}</div>
                    <div className="text-blue-700 font-bold mt-1">{product.price} د.م</div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={product.quantity}
                    onChange={(e) => updateQuantity(product.slug, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => removeFromCart(product.slug)}
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t pt-4 mb-4">
              <span className="font-bold text-lg">الإجمالي:</span>
              <span className="font-bold text-blue-700 text-xl">{totalPrice} د.م</span>
            </div>
            <button
              className="bg-gray-200 text-blue-600 px-4 py-2 rounded hover:bg-gray-300 mb-4 w-full"
              onClick={() => { setCart([]); setCartLS([]); setMessage("تم إفراغ السلة بنجاح!"); }}
            >
              إفراغ السلة
            </button>
          </>
        )}
        <div className="flex justify-between items-center mt-8">
          <Link href="/products" className="text-blue-600 hover:underline">&larr; متابعة التسوق</Link>
          {cartProducts.length > 0 && (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={async () => {
                try {
                  const res = await fetch('/api/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: cartProducts, total: totalPrice }),
                  });
                  if (res.ok) {
                    setCart([]); setCartLS([]);
                    setMessage("تم إرسال الطلب بنجاح! سيتم التواصل معك قريباً.");
                  } else {
                    setMessage("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
                  }
                } catch {
                  setMessage("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
                }
              }}
            >
              تأكيد الطلب
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
