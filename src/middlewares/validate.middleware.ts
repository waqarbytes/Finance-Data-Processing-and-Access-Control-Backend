import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.issues.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }
    next(error);
  }
};
