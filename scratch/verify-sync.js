
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const user = await prisma.user.findUnique({ where: { email: 'franflorom70@gmail.com' } });
    const products = await prisma.product.count();
    console.log('Admin user found:', !!user);
    console.log('Total products:', products);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
