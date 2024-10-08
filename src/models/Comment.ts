import { Schema, model, models } from "mongoose";
import { TUser } from "./User";

export interface TComment {
  _id: Schema.Types.ObjectId;
  author: TUser;
  content: string;
  likes: TUser[];
  createdAt: number;
}

const CommentSchema = new Schema<TComment>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Comment = models.Comment || model("Comment", CommentSchema);
