import { Request, Response } from 'express';
import { prisma } from '../index';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
