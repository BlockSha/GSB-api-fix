import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthenticatedRequest } from '../types/authenticatedRequest.js';

interface DecodedToken {
  userId: string;
  role: 'visiteur';
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header is missing.');
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new Error('Token is missing.');
    }

    const secret = process.env.JWT_SECRET || '';
    const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] }) as unknown as DecodedToken;

    req.auth = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
};