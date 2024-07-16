import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["name"]>;

export async function GET(req: Request, { params }: TParams) {
  await dbConnect();
  const slug_name = params.name;
  await Comment.init();

  const user = await User.findOne({ slug_name }).populate({
    path: "posts",
    populate: [
      { path: "likes", model: "User", select: "_id name image" },
      { path: "author", model: "User" },
      {
        path: "comments",
        model: "Comment",
        populate: {
          path: "author",
          model: "User",
        },
      },
    ],
  });

  if (!user) {
    return NextResponse.json({ error: "لا يمكن إيجاد مستخدم بهذا الإسم" });
  }

  return NextResponse.json({
    user,
  });
}

export async function DELETE(req: Request, { params }: TParams) {
  const { name } = params;

  const user = await User.findOne({ slug_name: name }).exec();

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

  try {
    await User.findOneAndDelete({ slug_name: name }).exec();
    return NextResponse.json({
      success: true,
      error: null,
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ ما أثناء حذف المستخدم",
        error,
        data: null,
      },
      { status: 500 }
    );
  }
}
