import { Router } from 'express'
import { protect } from '../middleware/authmiddleware.js';
import { createExpense, deleteExpense, getCategorySummary, getExpenseById, getExpenses, getMonthlySummary, updateExpense } from '../controllers/expenseController.js';

const router = Router();

router.get('/',protect , getExpenses )
router.post('/', protect , createExpense)
router.get("/category-summary",protect,getCategorySummary);
router.get("/monthly-summary",protect,getMonthlySummary);
router.get("/:id", protect, getExpenseById);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;