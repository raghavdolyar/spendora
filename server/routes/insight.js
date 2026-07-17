import express from 'express';
import { getInsights, generateInsight } from '../controllers/insight.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getInsights);
router.post('/generate', generateInsight);

export default router;
