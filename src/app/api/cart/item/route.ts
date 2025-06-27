import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { addToCart } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user && (session.user as { id?: number }).id) ? Number((session.user as { id?: number }).id) : null;
  if (!userId) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  const { productSlug, quantity } = await req.json();
  try {
    await addToCart({ userId, productSlug, quantity });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
