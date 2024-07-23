import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { User } from "@/models";
import { Manga } from "@/models/Manga";
import { Rating } from "@/models/Rating";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["slug"]>;

export async function POST(req: Request, { params }: TParams) {
  await dbConnect();
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

  const isRated = await Rating.findOne({ author: user._id }).exec();

  if (isRated) {
    return NextResponse.json({
      success: false,
      error: null,
      data: null,
    });
  }

  try {
    const review = await Rating.create({
      _id: new mongoose.Types.ObjectId(),
      rating: stars,
      review: text,
      author: user,
      createdAt: Date.now(),
    });
    await Manga.findOneAndUpdate(
      { slug },
      {
        $push: {
          rating: review._id,
        },
      }
    ).exec();

    return NextResponse.json(
      {
        success: true,
        error: null,
        data: "تم حفظ التقييم بنجاح",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("*".repeat(30));
    console.log({ error });
    console.log("*".repeat(30));
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
