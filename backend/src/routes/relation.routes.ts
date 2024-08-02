import { Router } from "express";
import { relationService } from "../modules/relation/service";
import { relationController } from "../modules/relation/controller";
import { authMiddleweare } from "../middlewares/authMiddleware";

const service = new relationService();
const controller = new relationController(service);

const relationRoutes = Router();

relationRoutes.use(authMiddleweare)
relationRoutes.get("/all", (req, res) => controller.getAllRelations(req, res));
relationRoutes.get("/get-id", (req, res) => controller.getById(req, res));
relationRoutes.post("/create", (req, res) => controller.create(req, res));
relationRoutes.patch("/update", (req, res) => controller.update(req, res))
relationRoutes.delete("/delete", (req, res) => controller.delete(req, res));

export { relationRoutes };
