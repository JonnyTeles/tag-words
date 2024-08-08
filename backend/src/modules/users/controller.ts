import { Request, Response } from "express";
import { userService } from "./service";
import { userCreate } from "../../interfaces/user-interface";

export class userController {
    private service: userService;
    constructor(service: userService) {
        this.service = service
    }

    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const userCreate: userCreate = { name, email, password }

        const userCreated = await this.service.create(userCreate)

        return res.status(200).json({
            created: userCreated
        });
    }

    async createAdmin(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const userCreate: userCreate = { name, email, password }

        const userCreated = await this.service.createAdmin(userCreate)

        return res.status(200).json({
            created: userCreated
        });
    }
}