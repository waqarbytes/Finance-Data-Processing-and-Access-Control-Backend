import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Only ADMIN users can fetch all the users
router.get('/', authenticate as any, authorize(['ADMIN']) as any, getAllUsers as any);

export default router;
