"use client";
import Link from "next/link";
import CartCount from "./CartCount";

export default function CartNavButton() {
  return (
    <Link href="/cart" className="relative bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0l1.7 6.385c.138.518.602.88 1.14.88h8.31c.538 0 1.002-.362 1.14-.88l1.7-6.385m-13.09 0h13.09m-13.09 0L5.25 17.25A2.25 2.25 0 007.485 19.5h9.03a2.25 2.25 0 002.235-2.25l1.5-11.25m-15.75 0V3m0 0h16.5" />
      </svg>
      <span className="font-bold">سلة المشتريات</span>
      <CartCount />
    </Link>
  );
}
