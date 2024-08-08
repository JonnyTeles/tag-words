import { user, userCreate, userServiceInterface } from "../../interfaces/user-interface";
import { prisma } from "../../prisma/client";
import bcrypt from "bcrypt"

export class userService implements userServiceInterface {
    async create(data: userCreate): Promise<Partial<user>> {
        const passwordHash = await bcrypt.hash(data.password, 8)
        const user = await prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash
            }
        })

        const { password, deleted, deleted_at, rolesId, ...userCreated } = user

        return userCreated
    }

    async createAdmin(data: userCreate): Promise<Partial<user>> {
        const passwordHash = await bcrypt.hash(data.password, 8)
        const userAdmin = await prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash,
                rolesId: 2
            }
        })

        const { password, deleted, deleted_at, rolesId, ...userAdminCreated } = userAdmin

        return userAdminCreated
    }
}