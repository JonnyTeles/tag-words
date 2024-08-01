import { Request, Response } from "express";
import { tagService } from "./service";

export class tagController {
    private service: tagService
    constructor(service: tagService) {
        this.service = service
    }

    async create(req: Request, res: Response) {
        const { tag } = req.body
        const { id } = req.user
        const tagCreate = {
            tag,
            userId: id
        }
        const result = await this.service.create(tagCreate)
        return res.status(200).json({
            created: result
        });
    }

    async getAllTags(req: Request, res: Response) {
        const result = await this.service.getAll()
        return res.status(200).json(result)
    }

    async getById(req: Request, res: Response) {
        const { id } = req.query
        const result = await this.service.getById(String(id))
        return res.status(200).json(result)
    }

    async getByName(req: Request, res: Response) {
        const { name } = req.query
        const result = await this.service.getByName(String(name))
        return res.status(200).json(result)
    }

    async update(req: Request, res: Response) {
        const { id } = req.query
        const { tag } = req.body
        const tagUpdate = {
            id: String(id),
            tag
        }
        const result = await this.service.update(tagUpdate)
        return res.status(200).json({
            updated: result
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.query
        await this.service.delete(String(id))
        return res.status(200).json('Tag deletada');
    }

    async getAllDeleted(req: Request, res: Response) {
        const result = await this.service.getAllDeleted()
        return res.status(200).json(result)
    }
}