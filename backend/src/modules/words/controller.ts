import { Request, Response } from "express";
import { wordService } from "./service";
import { AppError } from "../../errors/AppError";

export class wordController {
    private service: wordService;
    constructor(service: wordService) {
        this.service = service
    }

    async create(req: Request, res: Response) {
        const { word } = req.body
        //@ts-ignore
        const { id } = req.user //TODO - COLOCAR TIPAGEM
        const wordCreate = {
            word,
            userId: id
        }
        const result = await this.service.create(wordCreate)
        return res.status(200).json({
            created: result
        });
    }
    async getAllWords(req: Request, res: Response) {
        const result = await this.service.getAll();
        return res.status(200).json(result);
    }

    async getAllDeleted(req: Request, res: Response) {
        const result = await this.service.getAllDeleted();
        return res.status(200).json(result);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.query
        const result = await this.service.getById(String(id));
        return res.status(200).json(result)
    }

    async getByName(req: Request, res: Response) {
        const { name } = req.query
        const result = await this.service.getByName(String(name));
        return res.status(200).json(result)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.query
        await this.service.delete(String(id));
        return res.status(200).json('Palavra deletada');
    }
}