import { prisma } from '@/lib/prisma';

// إضافة منتج إلى سلة مستخدم
export async function addToCart({ userId, productSlug, quantity = 1 }: { userId: number, productSlug: string, quantity?: number }) {
  // جلب المنتج عبر slug
  const product = await prisma.product.findUnique({ where: { slug: productSlug } });
  if (!product) throw new Error('المنتج غير موجود');

  // جلب أو إنشاء السلة للمستخدم
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  // إضافة أو تحديث العنصر في السلة
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: product.id }
  });

  if (existingItem) {
    // تحديث الكمية إذا كان العنصر موجود
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
  } else {
    // إضافة عنصر جديد
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity
      }
    });
  }
}
