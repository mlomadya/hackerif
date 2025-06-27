import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, email, phone, bio, image } = await req.json();
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json({ error: 'معرّف المستخدم مطلوب' }, { status: 400 });
    }
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, phone, bio, image },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء التعديل' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء الحذف' }, { status: 500 });
  }
}
