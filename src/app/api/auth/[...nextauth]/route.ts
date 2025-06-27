
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "البريد الإلكتروني", type: "email" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;
        // إرجاع فقط الحقول المتوفرة والمتوافقة مع NextAuth
        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          createdAt: user.createdAt ? user.createdAt.toISOString() : null
        };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/", // إعادة توجيه صفحة تسجيل الدخول للصفحة الرئيسية أو أي صفحة أخرى مناسبة
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        (session.user as { id?: number }).id = Number(token.sub);
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
