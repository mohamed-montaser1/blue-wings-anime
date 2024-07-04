import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { Post } from "@/models";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["postId"]>;

export async function POST(req: Request, { params }: TParams) {
  await dbConnect();
  const body = await req.formData();
  const postId = params.postId;
  const userId = body.get("userId") as string;

  if (!isValidObjectId(postId)) {
    return NextResponse.json(
      {
        success: false,
        error: "المعرف غير صالح",
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

  if (post.likes.includes(userId)) {
    return disLike({ postId, userId });
  } else {
    return like({ postId, userId });
  }
}

type likeProps = { postId: string; userId: string };

async function disLike({ postId, userId }: likeProps) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
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
    return NextResponse.json({
      success: false,
      error,
      data: null,
    });
  }
}

async function like({ postId, userId }: likeProps) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
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
    return NextResponse.json({
      success: false,
      error,
      data: null,
    });
  }
}
