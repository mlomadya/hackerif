import React from 'react';
import Link from 'next/link';
import { books } from './data';

export default function BooksPage() {
  return (
    <main className="container mx-auto py-10 rtl text-right">
      <h1 className="text-3xl font-bold mb-6">الكتب التعليمية</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-5 flex flex-col items-center border border-zinc-100 dark:border-zinc-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fadein group"
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-28 h-28 object-contain mb-4 rounded-xl border border-zinc-200 dark:border-zinc-700 group-hover:rotate-2 group-hover:scale-110 transition-all"
            />
            <h2 className="font-bold text-lg mb-1 text-blue-700 dark:text-blue-300 text-center">{book.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 text-center line-clamp-2">{book.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 font-bold">{book.price} د.م</span>
            </div>
            <Link
              href={`/books/${book.slug}`}
              className="mt-2 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow group-hover:scale-105 text-center"
            >
              تفاصيل الكتاب
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
