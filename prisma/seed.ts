// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    await prisma.user.deleteMany({});
    await prisma.empresa.deleteMany({});
    await prisma.permission.deleteMany({});

    const permissionsToCreate = [
        'user:manage',
        'patio:create', 'patio:read', 'patio:update', 'patio:delete',
        'setor:create', 'setor:read', 'setor:update', 'setor:delete',
        'empresa:create', 'empresa:read', 'empresa:update', 'empresa:delete',
        'driver:create', 'driver:read', 'driver:update', 'driver:delete',
        'cidade:create', 'cidade:read', 'cidade:update', 'cidade:delete',
        'reboque:create', 'reboque:read', 'reboque:update', 'reboque:delete',
        'orgao:create', 'orgao:read', 'orgao:update', 'orgao:delete',
    ];

    for (const name of permissionsToCreate) {
        await prisma.permission.create({
            data: { name },
        });
    }
    console.log('Permissions created.');

    const allPermissions = await prisma.permission.findMany();
    const adminPermissions = allPermissions.filter(p =>
        !p.name.includes(':delete') && p.name !== 'user:manage'
    );

    const masterCompany = await prisma.empresa.create({
        data: {
            name: 'Administração Master'
        }
    });
    console.log('Master company created.');

    const superAdminPassword = await hash('=cZ2C&7Q&0S', 10);
    await prisma.user.create({
        data: {
            email: 'raulgouvea@gmail.com',
            name: 'Adm Master',
            password: superAdminPassword,
            empresaId: masterCompany.id,
            permissions: {
                connect: allPermissions.map((p) => ({ id: p.id })),
            },
        },
    });
    console.log('Super Admin user created.');

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });