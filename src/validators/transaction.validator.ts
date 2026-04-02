import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  date: z.string().optional().transform(val => val ? new Date(val) : new Date()),
});

export const updateTransactionSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional().transform(val => val ? new Date(val) : undefined),
});
