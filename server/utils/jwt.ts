import { User } from "../types/user";
import jwt from "jsonwebtoken";

export function generateToken(user: User): string {
  const SECRET = process.env.JWT_SECRET;
  if (SECRET) {
    const token = jwt.sign({ user }, SECRET, { expiresIn: "15min" });
    return token;
  }
  return "";
}
