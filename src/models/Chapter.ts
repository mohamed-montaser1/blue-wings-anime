import { Schema, model, models } from "mongoose";
import { TComment } from "./Comment";

export interface TChapter {
  _id: Schema.Types.ObjectId;
  number: number;
  comments: TComment[];
}

const ChapterSchema = new Schema<TChapter>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  number: {
    type: Number,
    required: true,
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
});

export const Chapter = models.Chapter || model("Chapter", ChapterSchema);
