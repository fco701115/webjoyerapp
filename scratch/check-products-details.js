
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });
    console.log('--- Detalle de productos ---');
    products.forEach(p => {
      console.log(`Producto: ${p.name}`);
      console.log(`- ID: ${p.id}`);
      console.log(`- Categoría vinculada: ${p.category ? p.category.name : 'NINGUNA (Error!!)'}`);
      console.log(`- Visible: ${p.isVisible}`);
      console.log(`- Stock: ${p.stock}`);
    });
  } catch (error) {
    console.error('Error en la consulta:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
