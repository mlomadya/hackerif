
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
      },
      orderBy: { id: 'desc' },
    });
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: [], error: 'حدث خطأ أثناء جلب المنتجات' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, image, description } = await req.json();
    if (!name || !price) {
      return NextResponse.json({ error: 'الاسم والسعر مطلوبان' }, { status: 400 });
    }
    // توليد slug تلقائي من الاسم
    const slug = name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\u0600-\u06FF-]+/g, '')
      .replace(/-+/g, '-');
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        image,
        slug,
        description: description || 'بدون وصف',
      },
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: 'حدث خطأ أثناء إضافة المنتج' }, { status: 500 });
  }
}
