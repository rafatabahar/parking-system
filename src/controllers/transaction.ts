import { Request, Response } from 'express'
// import { Get, Post, Route } from "tsoa";
import { Level, ILevel } from '../models/level'
import { Transaction } from '../models/transaction'

export default class TransactionController {
  
  public async park(req: Request, res: Response) {
    const level = await Level.findOne({
      'slots.available': true
    });
    // console.log(level);
  
    if (level) {
      const available_slot = JSON.parse(level!.availableSlot());
  
      // console.log(available_slot);
  
      Level.updateOne({
        'name': available_slot.level,
        'slots.number': available_slot.slot
      },
      {
        $set: { "slots.$.available" : false }
      }, function(err: any) {
        console.log(err)
      })
    
      // Transaction.build({
      //   park_time: Date.now()
      // })
      
      return res.status(201).json({
        message: "Successfully parking",
        data: available_slot
      }) 
    }else{
      return res.status(400).json({message: "Sorry, there is no parking slot available at the moment"}) 
    }
  }


  public async leave(req: Request, res: Response) {
    const { level, slot } = req.body;

    const levelData = await Level.findOne({
      'name': level
    });

    const check_data = this.checkSlotNumber(levelData!, slot);

    if (check_data) {
      // console.log("data found");
      if (!check_data.available) {
        Level.updateOne({
          'name': level,
          'slots.number': slot,
        }, {
          $set: { "slots.$.available" : true }
        }, function(err: any) {
          console.log(err)
        })
        return res.status(201).json({ message: `Successfully leaving from ${level} - ${slot}` })
      }else{
        return res.status(400).json({ message: "This slot already leaving" })
      }
    }else{
      // console.log("data not found");
      return res.status(400).json({ message: "Slot number not found" })
    }
  }

  checkSlotNumber(levelData: ILevel, slot_number: number) {
    return levelData!.slots!.find((row: any)=>{
      return row.number == slot_number
    })
  }
}