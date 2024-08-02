import { AppError } from "../../errors/AppError";
import { tag, tagCreate, tagServiceInterface, tagUpdate } from "../../interfaces/tag-interface";
import { prisma } from "../../prisma/client";

export class tagService implements tagServiceInterface {
    async create(data: tagCreate): Promise<tag> {
        const tagExist = await prisma.tags.findFirst({
            where: {
                tag: data.tag,
                deleted: false
            }
        })

        if (tagExist) throw new AppError(`Tag ${data.tag} já está cadastrada`, 404);

        const tagCreated = await prisma.tags.create({
            data: {
                tag: data.tag,
                usersId: data.userId
            }, include: {
                Users: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
        })
        return tagCreated
    }

    async getAll(): Promise<tag[]> {
        const tags = await prisma.tags.findMany({
            where: {
                deleted: false
            }
        })
        if (tags.length === 0) throw new AppError('Nenhuma tag cadastrada', 404)

        return tags
    }

    async getById(id: string): Promise<tag> {
        const tag = await prisma.tags.findUnique({
            where: {
                id,
                deleted: false
            }
        })
        if (!tag) throw new AppError(`Tag com ID ${id} não encontrada`, 404)

        return tag
    }

    async getByName(name: string): Promise<tag> {
        const tag = await prisma.tags.findFirst({
            where: {
                tag: name,
                deleted: false
            }
        })
        if (!tag) throw new AppError(`Tag ${name} não encontrada`, 404)

        return tag
    }

    async update(data: tagUpdate): Promise<tag> {
        const tag = await prisma.tags.findUnique({
            where: {
                id: data.id,
                deleted: false
            }
        })
        if (!tag) throw new AppError(`Tag com id ${data.id} não encontrada`, 404)

        const updatedTag = await prisma.tags.update({
            where: {
                id: data.id,
            }, data: {
                tag: data.tag
            }
        })
        return updatedTag
    }

    async delete(id: string): Promise<void> {
        const tag = await prisma.tags.findUnique({ where: { id, deleted: false } })
        if (!tag) throw new AppError(`Tag com ID ${id} não encontrada`, 404)
        await prisma.tags.update({
            where: { id },
            data: {
                deleted: true,
                deleted_at: new Date()
            }
        })
    }

    async getAllDeleted(): Promise<tag[]> {
        const deletedTags = await prisma.tags.findMany({ where: { deleted: true } })
        if (deletedTags.length === 0) {
            throw new AppError('Nenhuma palavra deletada', 404);
        }
        return deletedTags
    }
}