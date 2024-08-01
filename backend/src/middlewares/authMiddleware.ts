import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from "../prisma/client";

type jwtPayload = {
    id: string
}


//TODO - COLOCAR AUTH PARA ADM

export const authMiddleweare = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if (!authorization) throw new AppError('Não autorizado', 403)

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload

    const user = await prisma.users.findUnique({
        where: {
            id
        }
    })

    if (!user) throw new AppError('Não autorizado', 403)

    const { password, ...userLogin } = user

    req.user = userLogin

    next()
}