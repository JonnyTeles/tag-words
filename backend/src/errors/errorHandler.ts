import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { AppError } from './AppError';
import { JsonWebTokenError } from 'jsonwebtoken';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof PrismaClientKnownRequestError) {
        console.error(err)
        switch (err.code) {
            case 'P2025':
                return res.status(404).json({ message: 'Nada cadastrado' });
            case 'P2002':
                return res.status(409).json({ message: 'Já cadastrado' });
            case 'P2026':
                return res.status(404).json({ message: 'Registro não encontrado' });
            default:
                return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } else if (err instanceof PrismaClientValidationError) {
        console.error(err)
        return res.status(400).json({ message: "Entrada inválida" })
    } else if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "Error",
            message: err.message
        })
    } else if (err instanceof JsonWebTokenError) {
        return res.status(403).json({
            message: 'Não autorizado'
        })
    } else {
        console.error('\x1b[31mERRO NÃO TRATADO!\n' + err + '\x1b[0m');
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export { errorHandler };