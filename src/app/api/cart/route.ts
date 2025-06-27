import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// احصل على userId من الجلسة (يدعم next-auth الافتراضي)
import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";
async function getUserId() {
  const session = await getServerSession(authOptions) as Session;
  if (session?.user && (session.user as { id?: number }).id) {
    return Number((session.user as { id?: number }).id);
  }
  return null;
}

// جلب السلة الحالية للمستخدم
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });
  return NextResponse.json({ cart });
}
