import { AppError } from "../../errors/AppError";
import { word, wordServiceInterface, wordCreate } from "../../interfaces/word-interface";
import { prisma } from "../../prisma/client";

export class wordService implements wordServiceInterface {
    async create(wordCreate: wordCreate): Promise<word> {
        try {
            const createdWord = await prisma.words.create({
                data: {
                    word: wordCreate.word,
                    usersId: wordCreate.userId,
                    created_at: new Date(),
                    updated_at: new Date(),
                }, include: {
                    Users: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
            });
            return createdWord;
        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<word[]> {
        const words = await prisma.words.findMany({ where: { deleted: false } });
        if (words.length === 0) {
            throw new AppError('Nenhuma palavra cadastrada', 404);
        }
        return words
    }

    async getById(id: string): Promise<word> {
        const words = await prisma.words.findUnique({
            where: {
                id,
                deleted: false
            }, include: {
                Users: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
        }); //TODO - AJEITAR JSON DO RESULTADO

        if (!words) throw new AppError('Nenhuma palavra cadastrada', 404);

        return words
    }

    async getByName(name: string): Promise<word> {
        const words = await prisma.words.findUnique({
            where: {
                word: name,
                deleted: false
            }, include: {
                Users: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
        }); //TODO - AJEITAR JSON DO RESULTADO

        if (!words) throw new AppError('Nenhuma palavra cadastrada', 404);

        return words
    }

    async delete(id: string): Promise<void> {
        const word = await prisma.words.findUnique({ where: { id } })
        if (!word) throw new AppError('Nenhuma palavra cadastrada', 404);
        //await prisma.words.delete({ where: { id } })
        const deletedWord = await prisma.words.update({
            where: { id },
            data: {
                deleted_at: new Date(),
                deleted: true
            }
        }) //TODO - ADICIONAR RETURN
    }

    async getAllDeleted(): Promise<word[]> {
        const words = await prisma.words.findMany({ where: { deleted: true } });
        if (words.length === 0) {
            throw new AppError('Nenhuma palavra deletada', 404);
        }
        return words
    }
}