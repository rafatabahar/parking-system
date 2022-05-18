import express, { Request, Response } from 'express'
import { Level } from '../models/level'
import { Transaction } from '../models/transaction'

const router = express.Router()
router.post('/api/park', async (req: Request, res: Response) => {
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
    
    return res.status(201).send(available_slot) 
  }else{
    return res.status(400).send("Sorry, there is no slot available at the moment") 
  }
})

router.post('/api/leave', async (req: Request, res: Response) => {
  const { level, slot } = req.body;

  const data = await Level.findOne({
    'name': level
  });

  const check_data = data!.slots.find((row: any)=>{
    return row.number == slot
  })

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
      return res.status(201).send(`Successfully leaving from ${level} - ${slot}`)
    }else{
      return res.status(400).send("This slot already leaving")  
    }
  }else{
    // console.log("data not found");
    return res.status(400).send("Slot number not found")
  }
  
})

export { router as transactionRouter }