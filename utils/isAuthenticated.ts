import { NextApiRequest } from "next";
import { verify } from "jsonwebtoken";

export default function isAuthenticated(req: NextApiRequest) {
  let token = req.headers["authorization"]?.trim();
  if (!token || !token.startsWith("Bearer ")) {
    return false;
  }
  token = token.replace("Bearer ", "");

  let value = verify(token, process.env.JWT_SECRET as string);

  return value;
}
