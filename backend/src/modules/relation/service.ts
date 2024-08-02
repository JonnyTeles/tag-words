import { AppError } from "../../errors/AppError";
import { relactionServiceInterface, relation, relationCreate, relationUpdate } from "../../interfaces/relation-interface";
import { prisma } from "../../prisma/client";

export class relationService implements relactionServiceInterface {
    async create(data: relationCreate): Promise<relation> {
        const relationExist = await prisma.tag_Words.findFirst({
            where: {
                tagId: data.tagId,
                wordId: data.wordId,
                userId: data.userId
            }
        })
        if (relationExist) throw new AppError(`Relação já cadastrada por você`, 400)
        const result = await prisma.tag_Words.create({
            data: {
                tagId: data.tagId,
                wordId: data.wordId,
                userId: data.userId
            }, select: {
                word: {
                    select: {
                        id: true,
                        word: true
                    }
                },
                tag: {
                    select: {
                        id: true,
                        tag: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }, id: true, tagId: true, userId: true, wordId: true
            }
        })
        return result
    }

    async getAll(): Promise<relation[]> {
        const result = await prisma.tag_Words.findMany({
            select: {
                word: {
                    select: {
                        id: true,
                        word: true
                    }
                },
                tag: {
                    select: {
                        id: true,
                        tag: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }, id: true, tagId: true, userId: true, wordId: true
            }
        })
        if (result.length === 0) throw new AppError('Nenhuma relação cadastrada', 404)
        return result
    }

    async getById(id: string): Promise<relation> {
        const result = await prisma.tag_Words.findUnique({
            where: { id }, select: {
                word: {
                    select: {
                        id: true,
                        word: true
                    }
                },
                tag: {
                    select: {
                        id: true,
                        tag: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }, id: true, tagId: true, userId: true, wordId: true
            }
        })
        if (!result) throw new AppError(`Relação com ID ${id} não encontrada`, 404)
        return result
    }

    async update(data: relationUpdate): Promise<relation> {
        const oldRelation = await prisma.tag_Words.findUnique({
            where: {
                id: data.id
            },
            select: {
                tag: true,
                word: true
            }
        });

        const existingRelation = await prisma.tag_Words.findFirst({
            where: {
                tagId: data.newTagId || oldRelation?.tag.id,
                wordId: data.newWordId || oldRelation?.word.id,
                userId: data.userId
            }
        });

        if (existingRelation) {
            throw new AppError(`Relação já cadastrada por você`, 400);
        }

        const result = await prisma.tag_Words.update({
            where: {
                id: data.id
            },
            data: {
                tagId: data.newTagId || oldRelation?.tag.id,
                wordId: data.newWordId || oldRelation?.word.id
            }
        });

        return result;
    }

    async delete(id: string): Promise<void> {
        await prisma.tag_Words.delete({
            where: { id }
        })
    }
}