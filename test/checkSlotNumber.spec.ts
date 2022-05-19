import TransactionController from '../src/controllers/transaction'
import { ILevel } from '../src/models/level'
import { Request, Response } from 'express'

const dummyLevelData = {
  "name": "B2",
  "number_of_slots": 4,
  "slots": [
    {
      "number": 1,
      "available": true,
    },
    {
      "number": 2,
      "available": true,
    },
    {
      "number": 3,
      "available": true,
    },
    {
      "number": 4,
      "available": true,
    }
  ],
} as ILevel

const transactionController = new TransactionController();

describe('Function for checking parking slot number in level data', () => {
  test('Should return an object', () => {
    
    const check = transactionController.checkSlotNumber(dummyLevelData, 1);
    
    expect(check).not.toBeNull();
    expect(check).not.toBeUndefined();
    expect(check).toBeTruthy();
    
  })

  test('Should return the right object', () => {
    
    const check = transactionController.checkSlotNumber(dummyLevelData, 1);

    expect(check).toEqual({
      "number": 1,
      "available": true,
    });
    
  })

  test('Should return undefined / falshy', () => {
    
    const check = transactionController.checkSlotNumber(dummyLevelData, 10);

    expect(check).toBeUndefined();
    expect(check).not.toBeTruthy();
    expect(check).toBeFalsy();
    
  })

  // test('Test park', async () => {
  //   const request = {}
  //   const response = {}
    
  //   const check = await transactionController.park(request as Request, response as Response);

  //   console.log(check);
    
  // })
})