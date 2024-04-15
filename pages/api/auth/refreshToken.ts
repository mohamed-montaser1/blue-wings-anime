import createToken from "@/utils/generateToken";
import { setCookie } from "cookies-next";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
  let refreshToken = req.cookies["refresh_token"]?.trim();

  if (!refreshToken || !refreshToken.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  refreshToken = refreshToken.replace("Bearer ", "");
  let payload = verify(refreshToken, process.env.JWT_SECRET as string);

  let accessToken = "Bearer " + createToken(payload.sub as string, false);

  setCookie("access_token", accessToken, { req, res, httpOnly: true });

  return res.status(200).json({
    message: "successfully generated new access token",
  });
}
