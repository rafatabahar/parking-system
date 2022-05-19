import express, { Request, Response } from 'express';
import connectDb from './db/connection'
import seedInitialData from './db/seeder'
// import { Level } from './models/level'
import { json } from 'body-parser';
import Router from "./routes";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = require('../swagger.json');

const app = express()
app.use(json())
app.use('/api/v1', Router)

connectDb().then(() => seedInitialData())

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})