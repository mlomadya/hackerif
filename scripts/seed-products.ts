import { prisma } from '../src/lib/prisma';
import { products } from '../src/app/products/data';
import fs from 'fs';
import path from 'path';

async function main() {
  const logPath = path.join(__dirname, 'seed-products.log');
  const logs: string[] = [];
  for (const p of products) {
    // تحقق أن السعر رقم صحيح
    const price = Number(p.price);
    if (isNaN(price)) {
      const errMsg = `[${new Date().toISOString()}] خطأ: السعر غير صالح للمنتج: ${p.name} (slug: ${p.slug})`;
      logs.push(errMsg);
      console.error(errMsg);
      continue;
    }
    try {
      const result = await prisma.product.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          description: p.description,
          image: p.image,
          details: p.details,
          category: p.category,
          price: price,
        },
        create: {
          slug: p.slug,
          name: p.name,
          description: p.description,
          image: p.image,
          details: p.details,
          category: p.category,
          price: price,
        },
      });
      const logMsg = `[${new Date().toISOString()}] تم إضافة/تحديث المنتج: ${p.name} (slug: ${p.slug}, السعر: ${price})`;
      logs.push(logMsg);
      console.log(logMsg);
    } catch (err) {
      const errMsg = `[${new Date().toISOString()}] خطأ أثناء إضافة/تحديث المنتج: ${p.name} (slug: ${p.slug})\n${err}`;
      logs.push(errMsg);
      console.error(errMsg);
    }
  }
  fs.writeFileSync(logPath, logs.join('\n'), { encoding: 'utf8' });
  console.log('تم ترحيل وتحديث جميع المنتجات بنجاح. تم حفظ السجل في seed-products.log');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
