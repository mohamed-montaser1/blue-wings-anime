import { Schema, model, models } from "mongoose";
import { TUser } from "./User";
import { TChapter } from "./Chapter";
import { TRating } from "./Rating";

export interface TManga {
  _id: Schema.Types.ObjectId;
  slug: string;
  name: string;
  keywords: string[];
  chapters: TChapter[];
  rating: TRating[];
  type: "Manga" | "Manhwa" | "Manhua" | "Comic" | "Novel";
  status: "Ongoing" | "Completed" | "Hiatus";
  author: TUser;
  createdAt: number;
  credit: string;
  story: string;
  ratingNumber: number;
}

export const MangaSchema = new Schema<TManga>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Manga", "Manhwa", "Manhua", "Comic", "Novel"],
    },
    chapters: {
      type: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
      default: [],
    },
    rating: {
      type: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
      default: [],
    },
    ratingNumber: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["Ongoing", "Completed", "Hiatus"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    credit: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

MangaSchema.index({ slug: "text", name: "text" });

export const Manga = models.Manga || model("Manga", MangaSchema);
