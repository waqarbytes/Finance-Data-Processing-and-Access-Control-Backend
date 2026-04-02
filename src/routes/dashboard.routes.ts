import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate as any);
router.get('/summary', getDashboardSummary as any);

export default router;
