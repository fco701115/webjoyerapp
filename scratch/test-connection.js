
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    console.log('Conectando a:', process.env.DATABASE_URL ? 'URL encontrada' : 'URL NO ENCONTRADA');
    const users = await prisma.user.findMany({ take: 1 });
    console.log('Conexión exitosa. Usuarios encontrados:', users.length);
  } catch (error) {
    console.error('Error de conexión:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
