import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.user.deleteMany({});
  console.log('تم حذف جميع المستخدمين بنجاح');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
