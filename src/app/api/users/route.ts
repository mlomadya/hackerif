import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        phone: true,
        createdAt: true,
      },
      orderBy: { id: 'desc' },
    });
    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ users: [], error: 'حدث خطأ أثناء جلب المستخدمين' }, { status: 500 });
  }
}
