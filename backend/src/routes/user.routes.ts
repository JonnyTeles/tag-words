import { Router } from "express";
import { userController } from "../modules/users/controller";
import { userService } from "../modules/users/service";
import { authMiddleweareAdmin } from "../middlewares/authMiddleware";

const service = new userService()
const controller = new userController(service)


const userRoutes = Router()

userRoutes.post("/create", (req, res) => controller.create(req, res));
userRoutes.post("/admin-create", authMiddleweareAdmin, (req, res) => controller.createAdmin(req, res));

export { userRoutes }