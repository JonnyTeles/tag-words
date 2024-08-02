import { PrismaClient } from '@prisma/client'
import { roles } from './roles';

const prisma = new PrismaClient();

async function seedDataBase() {
    for (let role of roles) {
        await prisma.roles.create({
            data: role
        })
    }
}

seedDataBase()