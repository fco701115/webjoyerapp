const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@appecom.com';
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    console.log('❌ Admin user NOT found in DB:', email);
    // Let's check all users to see what we have
    const allUsers = await prisma.user.findMany({
      select: { email: true, role: true }
    });
    console.log('Current users in DB:', allUsers);
  } else {
    console.log('✅ Admin user found in DB:', user.email);
    console.log('   Role:', user.role);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error checking admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
