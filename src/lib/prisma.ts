import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(
    withOptimize({
      apiKey: process.env.OPTIMIZE_API_KEY ?? ''
    })
  );

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// دالة إضافة منتج إلى سلة مستخدم مع حماية إضافية
// ⚠️ يجب تمرير userId من الجلسة فقط وليس من جهة العميل مباشرة
export async function addToCart({ userId, productSlug, quantity = 1 }: { userId: number, productSlug: string, quantity?: number }) {
  // ⚠️ لا تمرر userId من جهة العميل أبداً! يجب جلبه من الجلسة المصدقة فقط.
  if (!userId || typeof userId !== 'number' || userId < 1 || !Number.isInteger(userId)) {
    console.error('معرّف المستخدم غير صالح');
    throw new Error('معرّف المستخدم غير صالح');
  }
  if (!productSlug || typeof productSlug !== 'string') {
    console.error('معرّف المنتج غير صالح');
    throw new Error('معرّف المنتج غير صالح');
  }
  if (!quantity || typeof quantity !== 'number' || quantity < 1 || !Number.isInteger(quantity)) {
    console.error('الكمية غير صالحة');
    throw new Error('الكمية غير صالحة');
  }

  const product = await prisma.product.findUnique({ where: { slug: productSlug } });
  if (!product) {
    console.error('المنتج غير موجود');
    throw new Error('المنتج غير موجود');
  }
  // إذا كان لديك حقل isActive أو isAvailable في المنتج، فعّل هذا الشرط بعد تعديله حسب قاعدة بياناتك

  let cart = await prisma.cart.findUnique({ where: { userId: Number(userId) } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: Number(userId) } });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: product.id }
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
    console.log('تم تحديث الكمية للمنتج في السلة');
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity
      }
    });
    console.log('تمت إضافة المنتج للسلة بنجاح');
  }
}

export default prisma;


