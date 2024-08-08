import { TUser } from "@/lib/types";
import { Schema, model, models } from "mongoose";
import { TManga } from "./Manga";

export interface TRating {
  _id: Schema.Types.ObjectId;
  author: TUser;
  rating: number;
  review: string;
  createdAt: number;
  manga: TManga;
}

const RatingSchema = new Schema<TRating>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  manga: {
    type: Schema.Types.ObjectId,
    ref: "Manga",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Rating = models.Rating || model("Rating", RatingSchema);
