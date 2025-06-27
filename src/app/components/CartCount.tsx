"use client";
import { useEffect, useState } from "react";
import { getCart } from "../lib/cartStorage";

export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // تحديث العدد عند تحميل الصفحة وأي تغيير في localStorage
    function updateCount() {
      const cart = getCart();
      setCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
    }
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  if (count === 0) return null;
  return (
    <span className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-bounce z-10">
      {count}
    </span>
  );
}
