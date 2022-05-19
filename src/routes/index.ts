import express from "express";
import LevelController from "../controllers/level";
import TransactionController from "../controllers/transaction";

const router = express.Router();

const levelController = new LevelController();
const transactionController = new TransactionController();

// level api
router.get('/level', levelController.getAllLevel.bind(levelController));
router.post('/level', levelController.createLevel.bind(levelController));

// transaction api
router.post('/park', transactionController.park.bind(transactionController));
router.post('/leave', transactionController.leave.bind(transactionController));

export default router;