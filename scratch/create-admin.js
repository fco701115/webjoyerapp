
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const email = 'franflorom70@gmail.com';
  const plainPassword = 'fco8523al';
  
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE'
      },
      create: {
        name: 'Administrador Principal',
        email: email,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE'
      }
    });
    
    console.log('✅ Usuario Administrador configurado exitosamente:');
    console.log('ID:', user.id);
    console.log('Email:', user.email);
    console.log('Rol:', user.role);
    
  } catch (error) {
    console.error('❌ Error al crear administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
