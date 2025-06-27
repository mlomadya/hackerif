import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, price, image, description } = await req.json();
    const id = Number(params.id);
    if (!id || !name || !price) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });
    }
    const product = await prisma.product.update({
      where: { id },
      data: { name, price: Number(price), image, description },
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: 'حدث خطأ أثناء التعديل' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'حدث خطأ أثناء الحذف' }, { status: 500 });
  }
}
