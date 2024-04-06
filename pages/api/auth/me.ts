import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import isAuthenticated from "@/utils/isAuthenticated";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });
  await connectDB();
  let checkAuthenticated = isAuthenticated(req);
  let id = (checkAuthenticated as JwtPayload)?.sub;
  let user = await User.findById(id);
  if (checkAuthenticated) {
    res.status(200).json({ user });
  } else {
    res
      .status(401)
      .json({ message: "يجب أن تسجل الدخول أولا لتحصل علي بياناتك" });
  }
}
