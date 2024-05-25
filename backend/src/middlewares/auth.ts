import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({
        message: `You are not authorized to view this page`,
      });
  }

  jwt.verify(token, `${process.env.APP_SECRET}`, (err, user) => {
    if (err) {
        return res.status(403).json({
            status: `Failed`,
            message: `Login required`,
          });
    }

    req.user = user;
    next();
  });
};
