const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'fcoalflorom@gmail.com';
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (user) {
    console.log('✅ User found:', user.email);
    console.log('   Role:', user.role);
    console.log('   Has password:', !!user.password);
  } else {
    console.log('❌ User not found');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
