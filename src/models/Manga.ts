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
}

const MangaSchema = new Schema<TManga>(
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
    status: {
      type: String,
      required: true,
      enum: ["Ongoing", "Completed", "Hiatus"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Number,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

export const Manga = models.Manga || model("Manga", MangaSchema);
