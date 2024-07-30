import "express-async-errors"
import express from 'express';
import logger from "morgan"
import { routes } from "./routes"
import { errorHandler } from "./errors/errorHandler"


const app = express()
app.use(express.json())

app.use(logger('dev'))
app.use(routes)

app.use(errorHandler)

app.listen(3333, () => console.log('App rodando na porta 3333...'))