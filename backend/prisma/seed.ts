const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const roles = [
    {
        id: 1,
        role: 'User'
    },
    {
        id: 2,
        role: 'Admin'
    }
];

const admins = [
    {
        name: "Admin",
        email: "admin@admin.com",
        password: "1234",
        rolesId: 2
    }
];

async function seedDataBase() {
    for (let role of roles) {
        try {
            await prisma.roles.upsert({
                where: { id: role.id },
                update: {},
                create: role
            });
        } catch (error) {
            console.error(error)
        }
    }

    for (let admin of admins) {
        try {
            await prisma.users.upsert({
                where: { email: admin.email },
                update: {},
                create: admin
            });
        } catch (error) {
            console.error(error)
        }
    }
}

seedDataBase()
    .catch(e => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Seed complete')
    });