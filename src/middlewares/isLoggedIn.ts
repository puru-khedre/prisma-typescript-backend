import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

export interface IRequestWithUser extends Request {
  user: User;
}

const secret: string = process.env.JWT_SECRET || "jwtsecret";

type T_JwtDecoded = {
  userId: string;
};

const isLoggedIn = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.send("please login first");
      throw new Error("You are not logged in");
    }

    const decoded = jwt.verify(token, secret) as T_JwtDecoded;

    req.user = await prisma.user.findUnique({ where: { id: decoded?.userId } });

    next();
  } catch (error: any) {
    throw new Error(error);
  }
};

export default isLoggedIn;
