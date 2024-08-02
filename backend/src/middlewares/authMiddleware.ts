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

//TODO - MIDLEWARE PESSOAL PRONTO, FALTA COLOCAR NAS ROTAS
export const authMiddleweareOnlyYour = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new AppError('Não autorizado', 403);
    }

    const token = authorization.split(' ')[1];

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

    const user = await prisma.users.findUnique({
        where: { id: userId },
        include: {
            created_tags: true,
            created_words: true
        }
    });

    if (!user) {
        throw new AppError('Não autorizado', 403);
    }

    const { id: queryId } = req.query;

    if (queryId && (user.created_tags.some(tag => tag.id === queryId) || user.created_words.some(word => word.id === queryId))) {
        const { password, ...userLogin } = user;
        req.user = userLogin;
        return next();
    }

    return res.status(403).json({ error: 'Acesso não autorizado.' });
}

export const authMiddleweareAdmin = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if (!authorization) throw new AppError('Não autorizado', 403)

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload

    const user = await prisma.users.findUnique({
        where: {
            id
        }
    })

    if (!user || user.rolesId !== 2 ) throw new AppError('Não autorizado', 403)

    const { password, ...userLogin } = user

    req.user = userLogin

    next()
}