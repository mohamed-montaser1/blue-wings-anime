import { Manga, TManga } from "@/models/Manga";
import mongoose from "mongoose";
import slugify from "slugify";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib";
/*
  _id: Schema.Types.ObjectId;
  slug: string;
  name: string;
  keywords: string[];
  chapters: TChapter[];
  rating: TRating[];
  type: "Manga" | "Manhwa" | "Manhua" | "Comic" | "Novel";
  status: "Ongoing" | "Completed" | "Hiatus";
  author: TUser;
  createdAt: number;
*/

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.formData();
  const name = body.get("name") as string;
  const keywords = body.get("keywords") || [];
  const chapters = body.get("chapters") || [];
  const rating = body.get("rating") || [];
  const type = body.get("type") as TManga["type"];
  const status = body.get("status") as TManga["status"];
  const author = body.get("author") as unknown as string;

  const errors = [];
  if (!name) {
    errors.push("يجب إدخال إسم المانجا");
  }
  if (!type) {
    errors.push("يجب إدخال نوع المانجا");
  }
  if (!status) {
    errors.push("يجب إدخال حالة المانجا");
  }
  if (!author) {
    errors.push("يجب إدخال المعرف الخاص (id) الخاص بالمنتج");
  }

  if (errors.length >= 1) {
    return NextResponse.json({
      success: false,
      error: true,
      messages: errors,
    });
  }

  const isExisted = await Manga.findOne({ name }).exec();

  if (isExisted) {
    return NextResponse.json({
      success: false,
      error: true,
      message: "يوجد مانجا بالفعل بهذا الإسم",
    });
  }

  try {
    await Manga.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      slug: slugify(name, {
        lower: true,
        replacement: "-",
        trim: true,
      }),
      keywords,
      chapters,
      rating,
      type,
      status,
      author,
    });
    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "تم إنشاء المانجا بنجاح",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("*".repeat(30));
    console.log({ error });
    console.log("*".repeat(30));
    return NextResponse.json(
      {
        success: false,
        error: error.errorResponse.errmsg,
        message: "حدث خطأ أثناء إنشاء المانجا من السيرفر. عاود المحاولة لاحقاً",
      },
      { status: 500 }
    );
  }
}
