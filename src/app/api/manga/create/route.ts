import { Manga, TManga } from "@/models/Manga";
import mongoose from "mongoose";
import slugify from "slugify";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib";
import { User } from "@/models";
import { slugifyOptions } from "@/lib/slugifyOptions";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { title, type, author, status, story, credit, keywords } = body;

  const errors = [];
  if (!title) {
    errors.push("يجب إدخال إسم المانجا");
  }
  if (!type) {
    errors.push("يجب إدخال نوع المانجا");
  }
  if (!status) {
    errors.push("يجب إدخال حالة المانجا");
  }
  if (!author) {
    errors.push("يجب إدخال البريد الإلكتروني الخاص بصانع المانجا");
  }
  if (!credit) {
    errors.push("يجب إدخال صورة الكريديت");
  }
  if (!story) {
    errors.push("يجب إدخال قصة المانجا");
  }

  if (errors.length >= 1) {
    return NextResponse.json(
      {
        success: false,
        error: errors,
        data: null,
      },
      { status: 400 }
    );
  }

  const isExisted = await Manga.findOne({
    slug: slugify(title, slugifyOptions),
  }).exec();

  let authorId;
  try {
    authorId = await User.findOne({ email: author })
      .exec()
      .then((author) => author._id);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "يجب أن يكون المستخدم مسجل",
        data: null,
      },
      { status: 404 }
    );
  }

  if (isExisted !== null) {
    return NextResponse.json(
      {
        success: false,
        error: "يوجد مانجا بالفعل بهذا الإسم",
        data: null,
      },
      { status: 409 }
    );
  }

  if (!authorId) {
    return NextResponse.json(
      {
        success: false,
        error: "لا يوجد مستخدم بالبريد الإلكتروني الذي ادخلته",
        data: null,
      },
      { status: 404 }
    );
  }

  try {
    const manga = await Manga.create({
      _id: new mongoose.Types.ObjectId(),
      name: title,
      slug: slugify(title, slugifyOptions),
      keywords,
      type,
      status,
      author: authorId,
      ratingNumber: 0,
      credit,
      story,
    });
    await User.findOneAndUpdate(
      { email: author },
      {
        $push: { creations: manga._id },
      }
    ).exec();
    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "تم إنشاء المانجا بنجاح",
      },
      { status: 201 }
    );
  } catch (error: any) {
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
