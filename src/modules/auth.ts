import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export interface CustomRequest extends Request {
  user: User;
}

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};
export const createJWT = (user: User) => {
  const token = jwt.sign({ ...user }, process.env.JWT_SECRET as string);
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as CustomRequest).user = user as User;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
