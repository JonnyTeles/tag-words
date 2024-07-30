import { Router } from "express";
import { loginController } from "../modules/login/controller";
import { loginService } from "../modules/login/service";



const service = new loginService()
const controller = new loginController(service)

const loginRoutes = Router()

loginRoutes.post("/", (req, res) => controller.login(req, res))

export { loginRoutes }