import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "../data";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

export default function BookDetails({ params }: Props) {
  const book = books.find((b) => b.slug === params.slug);
  if (!book) return notFound();
  return (
    <main className="container mx-auto py-10 rtl text-right">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center max-w-xl mx-auto">
        <Image src={book.image} alt={book.name} width={120} height={120} className="mb-4" />
        <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
        <p className="text-gray-700 mb-4">{book.description}</p>
        <div className="bg-gray-100 rounded p-4 text-gray-800 mb-4 w-full">
          {book.details}
        </div>
        <Link href="/books" className="text-blue-600 hover:underline">&larr; الرجوع للكتب</Link>
      </div>
    </main>
  );
}
