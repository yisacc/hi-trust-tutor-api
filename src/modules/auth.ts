import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";

export interface CustomRequest extends Request {
  user: User;
}

export const createJWT = (user: User) => {
  const token = jwt.sign({ ...user }, process.env.JWT_SECRET as string);
  return token;
};

export const protect = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user as User;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
