import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import isAuthenticated from "@/utils/isAuthenticated";
import sendEmailVerificationCodeTo from "@/utils/verificationCode";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  let result = isAuthenticated(req);
  if (!result.success) {
    return res.status(403).json({
      message: "المستخدم غير مسجل",
    });
  }
  await connectDB();
  let { email } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "لا يوجد مستخدم بهذا البريد الإلكتروني",
    });
  }

  let { success, code } = await sendEmailVerificationCodeTo(email);

  if (!success) {
    return res.status(500).json({
      message: "حدث خطأ أثناء إرسال الرساله !",
    });
  }

  setCookie("code", code, { req, res, httpOnly: true });

  return res.status(200).json({
    message: "تم إرسال رمز التحقق بنجاح",
  });
}
