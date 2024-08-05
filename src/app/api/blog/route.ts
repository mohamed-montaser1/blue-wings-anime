import { dbConnect } from "@/lib";
import { Article } from "@/models/Article";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

type TBody = {
  title: string;
  content: string;
  image: string;
};

// Create New Article
export const createBlogSchema = z.object({
  title: z
    .string()
    .min(5, { message: "يجب إدخال عنوان مكون من 5 أحرف علي الأقل" }),
  content: z
    .string()
    .min(100, { message: "يجب إدخال محتوى المقاله مكون من 100 حرف علي الأقل" }),
  image: z
    .string({ message: "يجب إدخال رابط الصوره" })
    .regex(/\/uploads\/.*\.(?:jpg|jpeg|gif|png)/, {
      message: "يجب ان يكون رابط الصوره من السيرفر",
    }),
});

export async function POST(req: Request) {
  await dbConnect()
  let body: TBody;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON input",
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const parsedVersion = createBlogSchema.parse(body);
    const article = await Article.create({
      _id: new mongoose.Types.ObjectId(),
      ...parsedVersion,
    });
    await article.save();
    return NextResponse.json(
      {
        success: true,
        error: null,
        data: article,
      },
      { status: 201 }
    );
  } catch (error) {
    let e = error as unknown as ZodError;
    return NextResponse.json(
      {
        success: false,
        errors: e.errors,
        data: null,
      },
      { status: 400 }
    );
  }
}

// GET All Blog
export async function GET() {
  try {
    const articles = await Article.find().exec();
    return NextResponse.json({
      success: true,
      error: null,
      data: articles,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ ما أثناء جلب المقالات عاود المحاولة لاحقاً",
        data: null,
      },
      { status: 500 }
    );
  }
}
