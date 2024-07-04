import { TDynamicAPIParams } from "@/lib/types";
import { Post } from "@/models";
import { Comment } from "@/models/Comment";
import mongoose, { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["postId"]>;

export async function POST(req: Request, { params }: TParams) {
  const body = await req.formData();
  const postId = params.postId;
  const userId = body.get("userId");

  if (!isValidObjectId(userId)) {
    return NextResponse.json(
      {
        success: false,
        error: "معرف المستخدم غير صالح",
        data: null,
      },
      { status: 400 }
    );
  }

  if (!isValidObjectId(postId)) {
    return NextResponse.json(
      {
        success: false,
        error: "معرف المنشور غير صالح",
        data: null,
      },
      { status: 400 }
    );
  }

  const post = await Post.findById(postId).exec();

  if (!post) {
    return NextResponse.json(
      {
        success: false,
        error: "لا يوجد منشور بهذا المعرف",
        data: null,
      },
      { status: 404 }
    );
  }

  try {
    const comment = await Comment.create({
      _id: new mongoose.Types.ObjectId(),
      author: userId,
      content: body.get("content"),
      likes: [],
      createdAt: Date.now(),
    });
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    )
      .populate({
        path: "author",
        model: "User",
      })
      .populate({
        path: "likes",
        model: "User",
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .exec();

    return NextResponse.json({
      success: true,
      error: null,
      data: updatedPost,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ أثناء إضافة التعليق",
        data: null,
      },
      { status: 500 }
    );
  }
}
