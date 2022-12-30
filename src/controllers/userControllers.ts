import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import cookieToken from "../utils/cookieToken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      throw new Error("please provide all fields");

    let user: User | null = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) throw new Error("user already exists");

    user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    cookieToken(user, res);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new Error("Please provide email and password");

    const user: User | null = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || password !== user.password)
      throw new Error("please provide valid password");

    cookieToken(user, res);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    res.json({ success: true });
  } catch (error: any) {
    throw new Error(error);
  }
};
