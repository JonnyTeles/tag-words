import { Request, Response } from "express";
import { loginService } from "./service";

export class loginController {
    private service: loginService
    constructor(service: loginService) {
        this.service = service
    }
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        const loginData = { email, password }

        const result = await this.service.login(loginData)

        return res.status(200).json(result)
    }

}