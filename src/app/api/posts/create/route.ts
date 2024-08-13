import { dbConnect } from "@/lib";
import { TCreateNewPostResponse } from "@lib/types";
import { Post } from "@models/Post";
import { TUser, User } from "@models/User";
import mongoose from "mongoose";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

type Req = Request & {
  session: Session;
};

export async function POST(req: Req): Promise<TCreateNewPostResponse> {
  await dbConnect();
  const body = await req.formData();
  const email = body.get("email");
  let post = {
    text: body.get("post-text") || "",
    images: JSON.parse(body.get("post-images") as string) as string[],
  };
  if (!email) {
    return NextResponse.json({
      success: false,
      error: "You Must Enter User Email",
      data: null,
    });
  }
  if (!post.text) {
    if (post.images.length < 1) {
      return NextResponse.json({
        success: false,
        error: "You Must Enter Post Information",
        data: null,
      });
    }
  }
  const user: TUser = await User.findOne({ email })
    .populate("posts", "-author -_id")
    .exec();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يمكن إيجاد مستخدم بهذا البريد الإلكتروني (${email})`,
        data: null,
      },
      { status: 404 }
    );
  }
  if (user.role !== "artist" && user.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        error: "يجب أن يكون المستخدم فنان لإضافة منشور",
        data: null,
      },
      { status: 400 }
    );
  }
  // Create New Post
  const newPost = await Post.create({
    _id: new mongoose.Types.ObjectId(),
    ...post,
    createdAt: Date.now(),
    author: user._id,
  });
  // Update User Posts By Adding The New Post
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $push: { posts: newPost._id },
      },
      { new: true }
    )
      .populate({
        path: "posts",
        populate: [
          {
            path: "author",
            model: "User",
          },
          {
            path: "likes",
            model: "User",
          },
          {
            path: "comments",
            model: "User",
          },
        ],
      })
      .exec();
    return NextResponse.json({
      success: true,
      error: null,
      data: updatedUser.posts,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error as string,
      data: null,
    });
  }
}
