import Manga from "@/models/Manga";
import User from "@/models/User";
import isAuthenticated from "@/utils/isAuthenticated";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  // Getting Data
  const { mangaName, mangaDescription, mangaImage, keywords, type } = req.body;
  // checking if user user authorization
  let result = isAuthenticated(req);
  if (!result.success) {
    return res.status(401).json({
      message: "المستخدم ليس مسجلاُ",
    });
  }
  // checking if user have permissions to create anime
  let user = await User.findById(result.sub as string);
  if (!user) {
    return res.status(404).json({
      message: "لا يوجد مستخدم بهذا المعرف الخاص !",
    });
  }

  if (!user.admin) {
    if (!user.artist) {
      return res.status(403).json({
        message: "المستخدم ليس لديه الصلاحية لإنشاء عمل جديد",
      });
    }
  }
  // checking valid data
  if (
    !mangaName ||
    !mangaDescription ||
    !mangaImage ||
    !Array.isArray(keywords) ||
    !type
  ) {
    return res.status(422).json({
      message: "يجب ادخال كامل البيانات المتوقعة",
      expectedData: [
        "mangaName",
        "mangaDescription",
        "mangaImage",
        "keywords",
        "type",
      ],
    });
  }
  // checking if there is an manga with this name
  let manga = await Manga.findOne({ mangaName });
  if (manga) {
    return res.status(400).json({
      message: "يوجد عمل موجود بالفعل بنفس الإسم يرجى تغيير الإسم",
    });
  }
  // creating new manga
  let newManga = await new Manga({
    _id: new mongoose.Types.ObjectId(),
    author: result.sub,
    ...req.body,
  });
  if (!newManga) {
    return res.status(500).json({
      message: "حدث خطأ ما يرجى المحاولة لاحقا",
    });
  }
  let err = newManga.validateSync();
  if (err) {
    let errors = [];
    for (let key in err.errors) {
      let error = err.errors[key];
      errors.push({ message: error.message, path: error.path });
    }
    return res.json({ errors });
  }
  try {
    await newManga.save().then(() => {
      return res.status(201).json({
        message: "تم إنشاء العمل بنجاح!",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "حدث خطأ ما يرجى المحاولة لاحقا",
    });
  }
}
