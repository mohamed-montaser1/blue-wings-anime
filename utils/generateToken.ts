import { sign } from "jsonwebtoken";

export default function createToken(userId: string) {
  return sign({ sub: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "2d",
  });
}
