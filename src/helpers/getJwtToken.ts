import jwt from "jsonwebtoken";
const secret: string = process.env.JWT_SECRET || "jwtsecret";

const getJwtToken = (userId: string): string => {
  return jwt.sign({ userId }, secret, { expiresIn: "1 day" });
};

export default getJwtToken;
