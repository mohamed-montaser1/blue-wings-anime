import { TDynamicAPIParams } from "@/lib/types";
import { Article } from "@/models/Article";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["id"]>;

// GET Article
export async function GET(req: Request, { params }: TParams) {
  const { id } = params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      {
        success: false,
        error: "معرف المقالة غير صالح",
        data: null,
      },
      { status: 400 }
    );
  }

  const article = await Article.findById(id).exec();

  if (!article) {
    return NextResponse.json(
      {
        success: false,
        error: "لا يوجد مقالة بهذا المعرف",
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    error: null,
    data: article,
  });
}

// DELETE Article
export async function DELETE(req: Request, { params }: TParams) {
  const { id } = params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      {
        success: false,
        error: "معرف المقالة غير صالح",
        data: null,
      },
      { status: 400 }
    );
  }

  const article = await Article.findById(id).exec();

  if (!article) {
    return NextResponse.json(
      {
        success: false,
        error: "لا يوجد مقالة بهذا المعرف",
        data: null,
      },
      { status: 404 }
    );
  }

  try {
    await Article.findByIdAndDelete(id).exec();
    return NextResponse.json({
      success: true,
      error: null,
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ أثناء حذف المقالة",
        data: null,
      },
      { status: 500 }
    );
  }
}
