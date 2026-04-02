import { Request, Response } from 'express';
import { prisma } from '../index';

export const getDashboardSummary = async (req: Request | any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;

    // Aggregate totals for the user
    const result = await prisma.transaction.groupBy({
      by: ['type'],
      where: { userId },
      _sum: {
        amount: true
      }
    });

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach(item => {
      if (item.type === 'INCOME') totalIncome += item._sum.amount || 0;
      if (item.type === 'EXPENSE') totalExpense += item._sum.amount || 0;
    });

    const categoryResult = await prisma.transaction.groupBy({
      by: ['category'],
      where: { userId },
      _sum: { amount: true }
    });

    const currentBalance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      currentBalance,
      categoryTotals: categoryResult.map(c => ({ category: c.category, total: c._sum.amount || 0 }))
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
