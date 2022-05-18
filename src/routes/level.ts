import express, { Request, Response } from 'express'
import { Level } from '../models/level'

const router = express.Router()

router.get('/api/level', async (req: Request, res: Response) => {
  const level = await Level.find({})
  return res.status(200).send(level)
})

router.post('/api/level', async (req: Request, res: Response) => {
  const { name, number_of_slots } = req.body;

  const level = Level.build({ name, number_of_slots })
  await level.save()
  return res.status(201).send(level)
})

export { router as levelRouter }