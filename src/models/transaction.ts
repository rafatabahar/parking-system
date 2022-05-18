import mongoose from 'mongoose'

interface ISlot {
  level: string,
  slot: number
}

interface ITransaction {
  park_time: number;
  leave_time: number;
  park_location: ISlot;
}

interface transactionModelInterface extends mongoose.Model<TransactionDoc> {
  build(attr: ITransaction): TransactionDoc
}

interface TransactionDoc extends mongoose.Document {
  park_time: number;
  leave_time: number;
  park_location: ISlot;
}

const transactionSchema = new mongoose.Schema({
  park_time: {
    type: Number,
    required: true
  },
  leave_time: {
    type: Number, 
    default: null
  },
  park_location: {
    type: Object, 
    default: null
  }
})

transactionSchema.statics.build = (attr: ITransaction) => {
  return new Transaction(attr)
}

const Transaction = mongoose.model<TransactionDoc, transactionModelInterface>('Transaction', transactionSchema)

export { Transaction }