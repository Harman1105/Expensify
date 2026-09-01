import express , {Router} from 'express'
import { addSavingsContribution, createSavingsGoal, getSavingsGoals } from "../controllers/savingsController.js";

import {protect }from "../middleware/authmiddleware.js";

const router = Router();


router.post("/", protect, createSavingsGoal);

router.get("/", protect, getSavingsGoals);

router.post("/:id/add", protect, addSavingsContribution);


export default router;