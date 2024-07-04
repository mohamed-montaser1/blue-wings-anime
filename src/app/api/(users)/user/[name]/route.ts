import { dbConnect } from "@/lib";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

type Props = { params: { name: string } };

export async function GET(req: Request, { params }: Props) {
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
