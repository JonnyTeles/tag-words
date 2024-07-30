import bcrypt from 'bcrypt';
import { AppError } from "../../errors/AppError";
import { loggedUser, iLogin, LoginServiceInterface } from "../../interfaces/login-interface";
import { prisma } from "../../prisma/client";
import jwt from 'jsonwebtoken'


export class loginService implements LoginServiceInterface {
    async login(data: iLogin): Promise<loggedUser> {
        const login = await prisma.users.findUnique({
            where: {
                email: data.email
            }
        })

        if (!login) throw new AppError("E-mail ou senha inválidos", 400)

        const verifyPass = await bcrypt.compare(data.password, login.password)

        if (!verifyPass) throw new AppError("E-mail ou senha inválidos", 400)

        const token = jwt.sign({ id: login.id }, process.env.JWT_SECRET ?? '', {
            expiresIn: '1d'
        })

        const { password, ...userLogin } = login

        return {
            user: login,
            token: token
        }
    }
}