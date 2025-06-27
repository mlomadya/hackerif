import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "البريد مستخدم" }, { status: 409 });
  const hashed = await hash(password, 10);
  await prisma.user.create({ data: { name, email, password: hashed } });
  return NextResponse.json({ ok: true });
}
