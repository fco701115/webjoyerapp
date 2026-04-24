require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function manageAdmins() {
  const newAdminEmail = 'fcoalflorom@gmail.com';
  const newAdminPassword = 'fco8523al';
  
  try {
    // 1. Create the new super admin
    const hashedPassword = await bcrypt.hash(newAdminPassword, 10);
    
    const newUser = await prisma.user.upsert({
      where: { email: newAdminEmail },
      update: {
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        name: 'Super Admin'
      },
      create: {
        name: 'Super Admin',
        email: newAdminEmail,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE'
      }
    });
    
    console.log('✅ Nuevo Super Admin configurado exitosamente:');
    console.log('ID:', newUser.id);
    console.log('Email:', newUser.email);
    console.log('Rol:', newUser.role);

    // 2. Find and delete the previous admins (all SUPER_ADMINs except the new one)
    const otherSuperAdmins = await prisma.user.findMany({
      where: {
        role: 'SUPER_ADMIN',
        email: {
          not: newAdminEmail
        }
      }
    });

    if (otherSuperAdmins.length > 0) {
      console.log('\nEncontrados administradores anteriores para eliminar:');
      for (const admin of otherSuperAdmins) {
        console.log(`- Eliminando: ${admin.email}`);
        await prisma.user.delete({
          where: { id: admin.id }
        });
      }
      console.log('✅ Administradores anteriores eliminados con éxito.');
    } else {
      console.log('\nNo se encontraron otros Super Admins para eliminar.');
    }
    
  } catch (error) {
    console.error('❌ Error gestionando administradores:', error);
  } finally {
    await prisma.$disconnect();
  }
}

manageAdmins();
