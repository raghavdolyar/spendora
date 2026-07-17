import express from 'express';
import {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrend,
} from '../controllers/dashboard.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/summary', getSummary);
router.get('/category-breakdown', getCategoryBreakdown);
router.get('/monthly-trend', getMonthlyTrend);

export default router;
