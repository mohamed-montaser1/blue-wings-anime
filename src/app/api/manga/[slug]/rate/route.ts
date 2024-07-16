import { TDynamicAPIParams } from "@/lib/types";
import { User } from "@/models";
import { Manga } from "@/models/Manga";
import { Rating } from "@/models/Rating";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["slug"]>;

export async function POST(req: Request, { params }: TParams) {
  const slug = params.slug;
  const { stars, text, user_name } = await req.json();

  const user = await User.findOne({ slug_name: user_name }).exec();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "لا يوجد مستخدم بهذا الإسم",
        data: null,
      },
      { status: 404 }
    );
  }

  if (!stars) {
    return NextResponse.json(
      {
        success: false,
        error: "يجب أن يكون النجمات أكبر من صفر",
        data: null,
      },
      { status: 400 }
    );
  }

  if (!text) {
    return NextResponse.json(
      {
        success: false,
        error: "يجب ان يكون للتقييم نص",
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const review = await Rating.create({
      _id: new mongoose.Types.ObjectId(),
      rating: stars,
      review: text,
      author: user,
    });
    await Manga.findOneAndUpdate(
      { slug },
      {
        $push: {
          rating: {
            review,
          },
        },
      }
    ).exec();

    return NextResponse.json({
      success: true,
      error: null,
      data: "تم حفظ التقييم بنجاح",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ ما",
        data: null,
      },
      { status: 500 }
    );
  }
}
