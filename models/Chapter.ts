import { Schema, model, models } from "mongoose";

interface Comment {}

export interface Chapter {
  _id: Schema.Types.ObjectId;
  chapterNumber: number;
  chapterName: string;
  comments: Comment[];
}

const ChapterSchema = new Schema<Chapter>(
  {
    _id: { type: Schema.Types.ObjectId },
    chapterNumber: { type: Number, required: true },
    chapterName: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default models.Chapter || model("Chapter", ChapterSchema);
