import { Post } from "@/models";
import { TPost } from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // make a query with filter that says give me the posts that it's images array not empty
  const posts: TPost[] = await Post.find({ images: { $ne: [] } })
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
