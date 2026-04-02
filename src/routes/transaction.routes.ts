import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transaction.controller';
import { validate } from '../middlewares/validate.middleware';
import { createTransactionSchema, updateTransactionSchema } from '../validators/transaction.validator';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate as any);

router.post('/', authorize(['ADMIN']) as any, validate(createTransactionSchema), createTransaction as any);
router.get('/', authorize(['ANALYST', 'ADMIN']) as any, getTransactions as any);
router.put('/:id', authorize(['ADMIN']) as any, validate(updateTransactionSchema), updateTransaction as any);
router.delete('/:id', authorize(['ADMIN']) as any, deleteTransaction as any);

export default router;
