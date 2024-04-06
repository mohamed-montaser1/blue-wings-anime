import jwt from "jsonwebtoken";

export default function createToken(userId: string) {
  console.log(process.env.JWT_SECRET as string);
  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
    expiresIn: "2 days",
  });

  return token;
}
