import { Schema, model, models } from "mongoose";
import { TComment } from "./Comment";
import { TManga } from "./Manga";

export interface TChapter {
  _id: Schema.Types.ObjectId;
  number: number;
  images: string[];
  comments: TComment[];
  createdAt: number;
  manga: TManga;
}

const ChapterSchema = new Schema<TChapter>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  images: {
    type: [String],
    required: true,
  },
  manga: {
    type: Schema.Types.ObjectId,
    ref: "Manga",
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
  createdAt: {
    type: Number,
  },
});

export const Chapter = models.Chapter || model("Chapter", ChapterSchema);
