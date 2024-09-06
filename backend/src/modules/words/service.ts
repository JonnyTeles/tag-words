import { AppError } from "../../errors/AppError";
import { word, wordServiceInterface, wordCreate, wordUpdate } from "../../interfaces/word-interface";
import { prisma } from "../../prisma/client";

export class wordService implements wordServiceInterface {
    async create(wordCreate: wordCreate): Promise<word> {
        const existWord = await prisma.words.findFirst({
            where: {
                word: wordCreate.word,
                deleted: false,
                usersId: wordCreate.userId
            }
        })

        if (existWord) throw new AppError(`Palavra ${wordCreate.word} já está cadastrada`, 400);

        const createdWord = await prisma.words.create({
            data: {
                word: wordCreate.word,
                usersId: wordCreate.userId,
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
                },
                Tag_Words: {
                    select: {
                        tagId: true,
                        tag: true,
                        id: true
                    }
                }
            },
        });
        if (!words) throw new AppError(`Palavra com ID ${id} nao encontrada`, 404);

        return words
    }

    async getYours(userId: string): Promise<word[]> {
        const words = await prisma.words.findMany({
            where: { usersId: userId, deleted: false }
        })

        if (words.length === 0) throw new AppError('Nenhuma palavra cadastrada', 404)

        return words
    }

    async getByName(name: string): Promise<word> {
        const word = await prisma.words.findFirst({
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
        });

        if (!word) throw new AppError(`Palavra ${name} não encontrada`, 404);

        return word
    }

    async update(data: wordUpdate): Promise<word> {
        const word = await prisma.words.findUnique({
            where: {
                id: data.id,
                deleted: false
            }
        })
        if (!word) throw new AppError(`Palavra com id ${data.id} não encontrada`, 404)

        const updatedword = await prisma.words.update({
            where: {
                id: data.id,
            }, data: {
                word: data.word
            }
        })
        return updatedword
    }

    async delete(id: string): Promise<void> {
        const word = await prisma.words.findUnique({ where: { id, deleted: false } })
        if (!word) throw new AppError(`Palavra com ID ${id} nao encontrada`, 404);
        await prisma.words.update({
            where: { id },
            data: {
                deleted_at: new Date(),
                deleted: true
            }
        })
        await prisma.tag_Words.deleteMany({
            where: { wordId: id },
        })
    }
    //TODO - COLOCAR APENAS PARA DELETAR A SUA
    async getAllDeleted(): Promise<word[]> {
        const deletedWords = await prisma.words.findMany({ where: { deleted: true } });
        if (deletedWords.length === 0) {
            throw new AppError('Nenhuma palavra deletada', 404);
        }
        return deletedWords
    }
}