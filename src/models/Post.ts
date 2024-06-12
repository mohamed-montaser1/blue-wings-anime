import { Schema, model, models } from "mongoose";
import { TUser } from "./User";
import { TComment } from "./Comment";

export interface TPost {
  _id: Schema.Types.ObjectId;
  images: string[];
  text: string;
  author: TUser;
  createdAt: number;
  likes: TUser[];
  comments: TComment[];
}

const PostSchema = new Schema<TPost>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    images: {
      type: [String],
      default: [],
    },
    text: {
      type: String,
      trim: true,
      default: "",
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

export const Post = models.Post || model("Post", PostSchema);
