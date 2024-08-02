import { Router } from "express";
import { tagController } from "../modules/tags/controller";
import { tagService } from "../modules/tags/service";
import { authMiddleweare, authMiddleweareOnlyYour } from "../middlewares/authMiddleware";

const service = new tagService();
const controller = new tagController(service);

const tagRoutes = Router();

tagRoutes.use(authMiddleweare)
tagRoutes.get("/all", (req, res) => controller.getAllTags(req, res));
tagRoutes.get("/get-id", (req, res) => controller.getById(req, res));
tagRoutes.get("/get-name", (req, res) => controller.getByName(req, res));
tagRoutes.get("/allDeleted", (req, res) => controller.getAllDeleted(req, res)); //TODO COLOCAR APENAS PARA ADM
tagRoutes.post("/create", (req, res) => controller.create(req, res));
tagRoutes.patch("/update", (req, res) => controller.update(req, res))
tagRoutes.delete("/delete", (req, res) => controller.delete(req, res));

export { tagRoutes }