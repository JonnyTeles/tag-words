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

        const { password, ...userCrated } = user

        return userCrated
    }
}