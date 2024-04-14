import { Schema, model, models } from "mongoose";
import { Chapter } from "./Chapter";
import { User } from "./User";

export interface Manga {
  _id: Schema.Types.ObjectId;
  mangaName: string;
  mangaDescription: string;
  mangaImage: string;
  mangaRate: number;
  chaptersNumber: number;
  chapters: Chapter[];
  keywords: string[];
  status: "Ongoing" | "Completed";
  type: "Manga" | "Manhwa" | "Manhua" | "Comic";
  author: User;
}

const MangaSchema = new Schema<Manga>(
  {
    _id: { type: Schema.Types.ObjectId },
    mangaName: {
      type: String,
      required: [true, "يجب إدخال إسم العمل"],
    },
    mangaDescription: {
      type: String,
      required: [true, "يجب إدخال وصف العمل"],
    },
    mangaImage: {
      type: String,
      required: [true, "يجب إدخال صورة العمل"],
    },
    mangaRate: {
      type: Number,
      default: 0,
    },
    chaptersNumber: {
      type: Number,
      default: 0,
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    keywords: [
      {
        type: String,
        required: [true, "يجب إدخال الكلمات المفتاحية"],
      },
    ],
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },
    type: {
      type: String,
      enum: ["Manga", "Manhwa", "Manhua", "Comic"],
      default: "Manga",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default models.Manga || model("Manga", MangaSchema);
