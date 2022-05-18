import express, { Request, Response } from 'express';
import mongoose from 'mongoose'
import { Level } from './models/level'
import { json } from 'body-parser';
import { levelRouter } from './routes/level'
import { transactionRouter } from './routes/transaction'

const app = express()
app.use(json())
app.use(levelRouter)
app.use(transactionRouter)

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Welcome')
})

mongoose.connect('mongodb://mongo:27017/parking-system').then(() => { 
  console.log('connected to database');
}).catch(function(err) {
  console.log(err);
});

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})