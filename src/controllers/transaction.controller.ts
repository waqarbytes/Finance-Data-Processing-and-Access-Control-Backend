import { Request, Response } from 'express';
import { prisma } from '../index';

export const createTransaction = async (req: Request | any, res: Response): Promise<void> => {
  try {
    const { amount, type, category, description, date } = req.body;
    const userId = req.user.id;

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        category,
        description,
        date: date ? new Date(date) : new Date(),
        userId
      }
    });

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTransactions = async (req: Request | any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { type, startDate, endDate } = req.query;

    const whereClause: any = { userId };

    if (type) whereClause.type = type;
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate as string);
      if (endDate) whereClause.date.lte = new Date(endDate as string);
    }

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: { date: 'desc' }
    });

    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateTransaction = async (req: Request | any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const data = req.body;

    const transaction = await prisma.transaction.findFirst({ where: { id, userId } });
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data
    });

    res.status(200).json({ message: 'Transaction updated', transaction: updatedTransaction });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTransaction = async (req: Request | any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await prisma.transaction.findFirst({ where: { id, userId } });
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    await prisma.transaction.delete({ where: { id } });

    res.status(200).json({ message: 'Transaction deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
