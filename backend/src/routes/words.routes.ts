import { Router } from "express";
import { wordService } from '../modules/words/service';
import { wordController } from './../modules/words/controller';
import { authMiddleweare, authMiddleweareAdmin } from "../middlewares/authMiddleware";

const service = new wordService();
const controller = new wordController(service);

const wordRoutes = Router();

wordRoutes.use(authMiddleweare)
wordRoutes.get("/all", (req, res) => controller.getAllWords(req, res));
wordRoutes.get("/get-id", (req, res) => controller.getById(req, res));
wordRoutes.get("/get-name", (req, res) => controller.getByName(req, res));
wordRoutes.get("/get-yours", (req, res) => controller.getYours(req, res));
wordRoutes.get("/allDeleted", authMiddleweareAdmin, (req, res) => controller.getAllDeleted(req, res)); 
wordRoutes.post("/create", (req, res) => controller.create(req, res));
wordRoutes.patch("/update", (req, res) => controller.update(req, res))
wordRoutes.delete("/delete", (req, res) => controller.delete(req, res));

export { wordRoutes };
