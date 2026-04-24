
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const products = await prisma.product.findMany();
    console.log('--- Resumen de productos en DB ---');
    console.log('Total:', products.length);
    products.forEach(p => {
      console.log(`- ID: ${p.id} | Nombre: ${p.name} | Visible: ${p.isVisible} | Stock: ${p.stock}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
