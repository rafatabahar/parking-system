import mongoose from 'mongoose'

interface ILevel {
  name: string;
  number_of_slots: number;
  slots?: Array<ILevelSlot>;
}

interface ILevelSlot {
  number: number,
  available: boolean
}

interface levelModelInterface extends mongoose.Model<LevelDoc> {
  build(attr: ILevel): LevelDoc;
}

interface LevelDoc extends mongoose.Document {
  name: string;
  number_of_slots: number;
  slots: Array<ILevelSlot>;

  availableSlot(): any;
}

const SlotSchema = new mongoose.Schema({
  number: Number,
  available: Boolean
});

const levelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number_of_slots: {
    type: Number, 
    required: true
  },
  slots: {
    type: [SlotSchema],
    default: undefined
  }
})

levelSchema.statics.build = (attr: ILevel) => {
  const slots = []
  // generate parking slots
  for (let i = 1; i <= attr.number_of_slots; i++) {
    slots.push({
      number: i,
      available: true
    })
  }
  attr.slots = slots
  return new Level(attr);
}

// method
levelSchema.methods.availableSlot = function (): string {
  const slot = this.slots.find((slot: any) => {return slot.available})

  if (slot) {
    return JSON.stringify({
      level: this.name,
      slot: slot.number
    }); 
  }else{
    return JSON.stringify({}); 
  }
}

const Level = mongoose.model<LevelDoc, levelModelInterface>('Level', levelSchema)

// Level.build({
//   name: 'B1',
//   number_of_slots: 10
// })

export { Level, ILevel }