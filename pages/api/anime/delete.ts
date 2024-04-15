import Manga from "@/models/Manga";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await connectDB();
  // isAuthenticated
  let auth = isAuthenticated(req);
  if (!auth) {
    return res.status(401).json({ message: "المستخدم غير مسجل" });
  }
  // is have permissions
  let user = await User.findById(auth.sub as string);
  if (!user.admin) {
    return res.status(403).json({ message: "ليس لديك صلاحية" });
  }
  // is there is no anime with this id
  let manga = await Manga.findById(req.query.id as string);
  if (!manga) {
    return res.status(404).json({ message: "لم يتم العثور على المانجا" });
  }
  // delete anime

  try {
    await Manga.findByIdAndDelete(req.query.id as string);
    return res.status(200).json({ message: "تم حذف المانجا بنجاح" });
  } catch (error) {
    return res.status(500).json({ message: "حدث خطأ ما" });
  }
}
