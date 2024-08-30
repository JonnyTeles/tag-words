import { Request, Response } from "express";
import { relationService } from "./service";
import { relationUpdate } from "../../interfaces/relation-interface";

export class relationController {
    private service: relationService
    constructor(relationService: relationService) {
        this.service = relationService
    }

    async create(req: Request, res: Response) {
        const { tagId, wordId } = req.body
        const { id } = req.user
        const relationCreate = {
            tagId: String(tagId),
            wordId: String(wordId),
            userId: id
        }
        const result = await this.service.create(relationCreate)
        return res.status(200).json({
            created: result
        });
    }


    async createMany(req: Request, res: Response) {
        const { tagId, wordId } = req.body;
        const { id } = req.user
        const relationCreate = {
            tagId: tagId,
            wordId: wordId,
            userid: id,
        };
        const result = await this.service.createMany(relationCreate)
        return res.status(200).json({
            created: result
        });
    }

    async getAllRelations(req: Request, res: Response) {
        const result = await this.service.getAll()
        return res.status(200).json(result)
    }

    async getById(req: Request, res: Response) {
        const { id } = req.query
        const result = await this.service.getById(String(id))
        return res.status(200).json(result)
    }

    async update(req: Request, res: Response) {
        const { id: queryId } = req.query;
        const { id: userId } = req.user;
        const { tagId, wordId } = req.body

        const relationUpdate: relationUpdate = {
            id: String(queryId),
            newTagId: tagId,
            newWordId: wordId,
            userId: userId
        }
        const result = await this.service.update(relationUpdate)
        return res.status(200).json({
            updated: result
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.query
        await this.service.delete(String(id))
        return res.status(200).json('Relação deletada');
    }

}