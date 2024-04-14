import User from "@/models/User";
import isAuthenticated from "@/utils/isAuthenticated";
import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  let result = isAuthenticated(req);

  if (!result.success) {
    return res.json({ message: "ليس لدا المستخدم صلاحية لتغيير كلمة المرور" });
  }

  let { newPassword } = req.body;

  const hashedPassword = await hash(newPassword, 12);

  try {
    await User.findByIdAndUpdate(result.sub, {
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "تم تغيير كلمة المرور بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "حدذ مشكلة اثناء تشفير كلمة المرور او اثناء حفظها في قاعدة البيانات",
    });
  }
}
