// حذف جميع المستخدمين من قاعدة البيانات (نسخة JavaScript CommonJS)
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  await prisma.user.deleteMany({});
  console.log('تم حذف جميع المستخدمين بنجاح');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
