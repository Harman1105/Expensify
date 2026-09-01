import { Router } from 'express'
import { protect } from '../middleware/authmiddleware.js';
import { getDashboard } from '../controllers/dashboardcontroller.js';

const router = Router();

router.get("/", protect, getDashboard);

export default router;
