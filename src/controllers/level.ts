import { Request, Response } from 'express'
import { Level } from '../models/level'

export default class LevelController {
  
  public async getAllLevel(_req: Request, res: Response) {
    const level = await Level.find({})
    return res.status(200).send(level)
  }

  public async createLevel(req: Request, res: Response) {
    const { name, number_of_slots } = req.body;

    const level = Level.build({ name, number_of_slots })
    await level.save()
    return res.status(201).send(level)
  }
}