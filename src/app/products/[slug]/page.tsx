import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../productsData";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

export default function ProductDetails({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();
  return (
    <main className="container mx-auto py-10 rtl text-right">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center max-w-xl mx-auto">
        <Image src={product.image} alt={product.name} width={120} height={120} className="mb-4" />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="bg-gray-100 rounded p-4 text-gray-800 mb-4 w-full">
          {product.details}
        </div>
        <Link href="/products" className="text-blue-600 hover:underline">&larr; الرجوع للمنتجات</Link>
// ...existing code...
import Link from "next/link";
      </div>
    </main>
  );
}
