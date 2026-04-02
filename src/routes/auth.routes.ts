import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', validate(registerSchema), registerUser as any);
router.post('/login', validate(loginSchema), loginUser as any);
router.get('/me', authenticate as any, getMe as any);

export default router;
