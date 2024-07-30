import { Router } from "express";
import { wordService } from '../modules/words/service';
import { wordController } from './../modules/words/controller';
import { authMiddleweare } from "../middlewares/authMiddleware";

const service = new wordService();
const controller = new wordController(service);

const wordRoutes = Router();

wordRoutes.use(authMiddleweare)
wordRoutes.get("/", (req, res) => controller.getAllWords(req, res));
wordRoutes.get("/id", (req, res) => controller.getById(req, res));
wordRoutes.get("/name", (req, res) => controller.getByName(req, res));
wordRoutes.get("/allDeleted", (req, res) => controller.getAllDeleted(req, res)); //TODO COLOCAR APENAS PARA ADM
wordRoutes.post("/", (req, res) => controller.create(req, res));
wordRoutes.delete("/", (req, res) => controller.delete(req, res));

export { wordRoutes };
