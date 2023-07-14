import { Request } from "express";
import prisma from "../db";
import { Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const register = async (req: Request, res: Response) => {
  const role = await prisma.role.findUnique({
    where: {
      name: "User",
    },
  });
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      roleId: role!.id,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401).json({ message: "User Not found!" });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user!.password);

  if (!isValid) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
