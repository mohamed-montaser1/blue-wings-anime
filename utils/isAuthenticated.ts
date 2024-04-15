import { NextApiRequest } from "next";
import { JwtPayload, verify } from "jsonwebtoken";

type ReturnedValue = { success: boolean; sub?: string };

export default function isAuthenticated(req: NextApiRequest): ReturnedValue {
  let token = req.cookies["token"]?.trim();
  if (!token || !token.startsWith("Bearer ")) {
    return { success: false };
  }
  token = token.replace("Bearer ", "");

  let value = verify(token, process.env.JWT_SECRET as string) as {
    sub: string;
  };

  return {
    success: true,
    sub: value.sub,
  };
}
