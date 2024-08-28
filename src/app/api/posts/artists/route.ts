import { Post } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const posts = await Post.find({})
    .limit(10)
    .select("-likes -comments -__v")
    .populate("author", "name slug_name image role createdAt")
    .exec();
  return NextResponse.json({
    success: true,
    error: null,
    posts,
  });
}
