import express from "express";
import LevelController from "../controllers/level";
import TransactionController from "../controllers/transaction";

const router = express.Router();

const levelController = new LevelController();
const transactionController = new TransactionController();

// level api
router.get('/level', levelController.getAllLevel);
router.post('/level', levelController.createLevel);

// transaction api
router.post('/park', transactionController.park);
router.post('/leave', transactionController.leave);

export default router;