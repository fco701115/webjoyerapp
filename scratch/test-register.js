
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function testRegister() {
  try {
    const email = 'test_repro_' + Date.now() + '@example.com';
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    console.log('Intentando crear usuario:', email);
    
    const user = await prisma.user.create({
      data: {
        name: 'Test Repro',
        email: email,
        password: hashedPassword,
        role: 'USER',
        status: 'ACTIVE'
      }
    });
    
    console.log('✅ Usuario creado exitosamente:', user.id);
    
    // Cleanup
    await prisma.user.delete({ where: { id: user.id } });
    console.log('✅ Usuario de prueba eliminado');
    
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testRegister();
