import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/connectDB";
import createToken from "@/utils/generateToken";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });
  await connectDB();
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(409)
      .json({ message: "لا يوجد مستخدم مسجل بهذا الإيميل" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "كلمة السر يجب أن لا تقل عن 8 حروف" });
  }

  // compare input password with the hashed password
  let correctPassword = bcrypt.compareSync(password, user.password);

  if (!correctPassword) {
    return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
  }

  let token = createToken(user._id);

  setCookie("token", token, { req, res });
  // correct password & email
  return res.status(200).json({ success: true, message: "login success" });
}
