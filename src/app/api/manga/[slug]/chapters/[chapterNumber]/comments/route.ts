import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { Chapter, TChapter } from "@/models/Chapter";
import { Manga } from "@/models/Manga";
import { Schema, Types } from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Comment } from "@models/Comment";
import { User } from "@/models";

type TParams = TDynamicAPIParams<["slug", "chapterNumber"]>;

// Return Response With All Comments On This Chapter Of Manga
export async function GET(req: Request, { params }: TParams) {
  await dbConnect();
  const { slug, chapterNumber } = params;
  const manga = await Manga.findOne({ slug }).populate("chapters").exec();
  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يوجد عمل بهذا الإسم (${slug})`,
        data: null,
      },
      { status: 404 }
    );
  }

  const chapter = (manga.chapters as TChapter[]).find(
    (chapter) => +chapter.number === +chapterNumber
  );

  return NextResponse.json({
    success: true,
    error: null,
    comments: chapter?.comments,
  });
}

const emailSchema = z
  .string({ message: "يجب أن يكون البريد نصاً" })
  .email("يجب إدخال بريد إلكتروني صالح");

// Return Response With Created Comment
export async function POST(req: Request, { params }: TParams) {
  await dbConnect();
  const { slug, chapterNumber } = params;
  const form = await req.formData();
  /*
    _id: ObjectId
    Author: Email
    Content: Text
    Likes: Empty Array
    CreatedAt: Date.now()
  */
  const author = form.get("author") as string;
  const content = form.get("content") as string;
  let comment = {
    _id: new Types.ObjectId(),
    likes: [],
    createdAt: Date.now(),
  };

  console.log({ comment });

  if (!emailSchema.safeParse(author)) {
    return NextResponse.json(
      {
        success: false,
        error: "يجب إدخال بريد صالح",
        data: null,
      },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email: author }).exec();
  const manga = await Manga.findOne({ slug }).populate("chapters").exec();

  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يوجد عمل بهذا الإسم (${slug})`,
        data: null,
      },
      { status: 404 }
    );
  }

  const chapter = (manga.chapters as TChapter[]).find(
    (chapter) => +chapter.number === +chapterNumber
  );

  if (!chapter) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يوجد فصل بهذا الرقم (${chapterNumber})`,
        data: null,
      },
      { status: 404 }
    );
  }

  try {
    // Create Comment [Done]
    // Update Chapter Comments [Done]
    // Return Success Response [Done]
    const newComment = await Comment.create({
      ...comment,
      author: user._id,
      content,
    });
    const updatedChapter: TChapter = await Chapter.findByIdAndUpdate(
      chapter._id,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    )
      .populate({
        path: "comments",
        model: "Comment",
        populate: [{ path: "author", model: "User" }],
      })
      .populate("author")
      .exec();
    return NextResponse.json(
      {
        success: true,
        error: null,
        comments: updatedChapter.comments,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
        data: null,
      },
      { status: 500 }
    );
  }
}
