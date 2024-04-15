import { sign } from "jsonwebtoken";

export default function createToken(userId: string, refreshToken: boolean) {
  return sign({ sub: userId }, process.env.JWT_SECRET as string, {
    expiresIn: refreshToken ? "1w" : "40m",
  });
}
