
"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import React, { useState, useEffect } from "react";
import OrderForm from "../components/OrderForm";
import Image from "next/image";
import { products } from "../products/productsData";
import Link from "next/link";
import { getCart, setCart } from "../lib/cartStorage";

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

export default function CartPage() {
  const [cart, setCartState] = useState<{ slug: string; quantity: number }[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  // إضافة منتج للسلة (للاستخدام المستقبلي)
  // ملاحظة: تم استيراد setCart من lib/cartStorage بالفعل، لا داعي لتعريف دالة setCart هنا
  // إذا كنت بحاجة لدالة محلية، استخدم اسم مختلف أو استعمل setCart مباشرة من lib
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

  const cartProducts = cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as CartProduct[];

  // حساب السعر الإجمالي
  const totalPrice = cartProducts.reduce((sum, product: CartProduct) => sum + (product.price * product.quantity), 0);

  return (
    <main className="container mx-auto py-10 rtl text-right">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 animate-fadein border border-blue-100">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
            <span className="text-xs mt-1 text-blue-700">السلة</span>
          </div>
          <div className="w-8 h-1 bg-blue-200 rounded"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">2</div>
            <span className="text-xs mt-1 text-gray-500">الدفع</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">سلة المشتريات</h1>
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-center animate-fadein shadow-sm">
            {message}
          </div>
        )}
        {cartProducts.length === 0 ? (
          <div className="text-gray-400 text-center mb-6 text-lg">سلتك فارغة حالياً.</div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-6">
              {cartProducts.map((product: CartProduct) => (
                <div key={product.slug} className="flex items-center gap-4 border-b pb-4 last:border-b-0 bg-gray-50 rounded-lg px-2 py-2">
                  <Image src={product.image || '/vercel.svg'} alt={product.name} width={64} height={64} className="w-16 h-16 object-cover rounded shadow border border-gray-200" />
                  <div className="flex-1">
                    <div className="font-semibold text-blue-900">{product.name}</div>
                    <div className="text-gray-500 text-xs mb-1 line-clamp-1">{product.description}</div>
                    <div className="text-blue-700 font-bold mt-1">{product.price} د.م</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.slug, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1 text-center focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                      className="text-xs text-red-600 hover:underline mt-1"
                      onClick={() => removeFromCart(product.slug)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t pt-4 mb-4">
              <span className="font-bold text-lg text-blue-900">الإجمالي:</span>
              <span className="font-bold text-blue-700 text-xl">{totalPrice} د.م</span>
            </div>
            <button
              className="bg-gray-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 mb-4 w-full border border-gray-200 transition"
              onClick={() => { setCart([]); setMessage("تم إفراغ السلة بنجاح!"); }}
            >
              <span className="font-semibold">إفراغ السلة</span>
            </button>
            {/* تم حذف خيارات الدفع (PayPal و Binance Pay) بناءً على طلبك */}
          </>
        )}
        <div className="flex justify-between items-center mt-8 flex-col gap-4">
          <Link href="/products" className="text-blue-600 hover:underline text-sm">&larr; متابعة التسوق</Link>
        </div>
        <div className="mt-10">
          <OrderForm defaultProduct={cartProducts.length > 0 ? cartProducts.map(p => `${p.name} (x${p.quantity})`).join(", ") : ""} />
        </div>
      </div>
    </main>
  );
}
