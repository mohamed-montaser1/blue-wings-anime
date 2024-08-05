import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { Chapter } from "@/models/Chapter";
import { Manga, TManga } from "@/models/Manga";
import { isValidSlug } from "@/utils/isValidSlug";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";

type TParams = TDynamicAPIParams<["slug"]>;

let imageSchema = z.array(z.string());

// Create New Chapter
export async function POST(req: Request, { params }: TParams) {
  await dbConnect();
  const { slug } = params;
  const form = await req.formData();
  const images = JSON.parse(form.get("images") as unknown as string);

  if (!isValidSlug(slug)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid slug",
        data: null,
      },
      { status: 400 }
    );
  }

  if (!imageSchema.safeParse(images)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid images",
        data: null,
      },
      { status: 400 }
    );
  }

  const manga = await Manga.findOne({ slug }).exec();

  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: "Manga not found",
        data: null,
      },
      { status: 404 }
    );
  }

  try {
    const id = new mongoose.Types.ObjectId();
    const chapter = await Chapter.create({
      _id: id,
      number: manga.chapters.length + 1,
      images,
      manga: manga._id,
      comments: [],
      createdAt: Date.now(),
    });
    await Manga.findOneAndUpdate(
      { slug },
      {
        $push: { chapters: id },
      }
    ).exec();
    return NextResponse.json(
      {
        success: true,
        error: null,
        data: chapter,
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

// Get All Chapters
export async function GET(req: Request, { params }: TParams) {
  await dbConnect()
  const { slug } = params;
  const manga: TManga = await Manga.findOne({ slug }).exec();
  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: "Manga not found",
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    error: null,
    data: manga.chapters,
  });
}
