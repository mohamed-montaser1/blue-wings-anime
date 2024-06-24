import { TUser } from "@/lib/types";
import { Schema, model, models } from "mongoose";

export interface TRating {
  _id: Schema.Types.ObjectId;
  author: TUser;
  rating: number;
  review: string;
  createdAt: number;
}

const RatingSchema = new Schema<TRating>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

export const Rating = models.Rating || model("Rating", RatingSchema);
