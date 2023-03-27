import { Request, Response, NextFunction } from 'express';
import { IUser } from "../models/User.model";

interface AuthRequest extends Request {
  user?: IUser;
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const user = req.user;
  console.log(user?.role)

  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  next();
};
