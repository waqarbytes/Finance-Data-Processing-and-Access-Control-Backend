import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import transactionRoutes from './routes/transaction.routes';
import dashboardRoutes from './routes/dashboard.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Ensure Prisma doesn't crash if .env is missing and DATABASE_URL is undefined
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

// Initialize Prisma 7 with SQLite Driver Adapter
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
export const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Finance Dashboard API is running');
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
