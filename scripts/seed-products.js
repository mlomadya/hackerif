const { prisma } = require('../src/lib/prisma');
const { products } = require('./products');

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        image: p.image,
        details: p.details,
        category: p.category,
        price: p.price,
      },
    });
  }
  console.log('تم ترحيل المنتجات بنجاح');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
