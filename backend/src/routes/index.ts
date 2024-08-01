import { Router } from "express";
import { wordRoutes } from "./words.routes";
import { userRoutes } from "./user.routes";
import { loginRoutes } from "./login.routes";
import { tagRoutes } from "./tag.routes";

const routes = Router()

routes.use('/words', wordRoutes);
routes.use('/users', userRoutes)
routes.use('/login', loginRoutes)
routes.use('/tags', tagRoutes)

export { routes }