import { iUser, iUserCreate, iUserService } from "../../interfaces/user-interface";
import { prisma } from "../../prisma/client";
import bcrypt from "bcrypt"

export class userService implements iUserService {
    async create(data: iUserCreate): Promise<Partial<iUser>> {
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