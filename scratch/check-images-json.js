
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const products = await prisma.product.findMany();
    products.forEach(p => {
      console.log(`Producto: ${p.name}`);
      console.log(`Images RAW: ${p.images}`);
      try {
        JSON.parse(p.images);
        console.log('JSON Check: OK');
      } catch (e) {
        console.log('JSON Check: FAIL');
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
