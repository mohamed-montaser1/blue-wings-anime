import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/connectDB";
import createToken from "@/utils/generateToken";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });
  await connectDB();
  const { username, email, password, confirmPassword, isArtist, isAdmin } =
    req.body;
  if (
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    isAdmin === undefined ||
    isArtist === undefined
  ) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "كلمة السر يجب أن تكون مطابقة لتأكيد كلمة السر" });
  }
  delete req.body.confirmPassword;

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (user) {
    return res
      .status(409)
      .json({ message: "البريد الإلكتروني أو أسم المستخدم مستخدم بالفعل" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "كلمة السر يجب أن لا تقل عن 8 حروف" });
  }
  if ((username as string).includes(" ")) {
    return res.json({
      message: "إسم المستخدم يجب أن يحتوي علي حروف وأرقام وعلامة _ فقط",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  let newUser = await new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password: hashedPassword,
    artist: isArtist,
    admin: isAdmin,
  });
  let err = newUser.validateSync();
  if (err) {
    return res.json({ message: err.errors.email.message });
  }
  let token = createToken(newUser._id.toString());

  try {
    await newUser.save().then(() => {
      return res.status(201).json({ token });
    });
  } catch (error) {
    res.json({ message: "error while saving user", error });
  }
}
