import { User } from "@prisma/client";
import { Response, CookieOptions } from "express";
import getJwtToken from "../helpers/getJwtToken";

const cookieToken = (user: User, res: Response): void => {
  const token: string = getJwtToken(user.id);

  const options: CookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).send({
    success: true,
    token,
    user,
  });
};

export default cookieToken;
