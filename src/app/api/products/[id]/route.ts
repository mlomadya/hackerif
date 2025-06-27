import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, context: { params?: { id?: string } }) {
  const id = context.params?.id;
  if (!id) {
    return new Response("معرّف المنتج غير موجود", { status: 400 });
  }
  const data = await request.json();
  // هنا تضع منطق التعامل مع البيانات
  return new Response("تم التحديث بنجاح", { status: 200 });
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
