import mongoose, { Schema, model, models } from "mongoose";
import { TPost } from "./Post";
import DateController from "@/utils/date";
import { TManga } from "./Manga";

export type UserRole = "user" | "admin" | "artist" | "editor";
export interface TUser {
  _id: Schema.Types.ObjectId;
  name: string;
  slug_name: string;
  email: string;
  bio: string;
  image: string;
  cover: string;
  password: string;
  role: UserRole;
  discord: string;
  email_verified: boolean;
  createdAt: number;
  posts: TPost[];
  favoriteManga: TManga[];
  creations: TManga[];
}

const UserSchema = new Schema<TUser>(
  {
    // _id: {
    //   type: Schema.Types.ObjectId,
    // },
    name: {
      type: String,
      trim: true,
      // unique: true,
    },
    slug_name: {
      type: String,
      trim: true,
      lower: true,
      // unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minlength: 10,
    },
    image: {
      type: String,
      default: "/default-profile.jpg",
    },
    cover: {
      type: String,
      default: "/default-cover.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "artist", "editor", "user"],
      default: "user",
    },
    discord: {
      type: String,
      default: "",
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    favoriteManga: {
      type: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
      default: [],
    },
    creations: {
      type: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
      default: [],
    },
  },
  { timestamps: true, id: true }
);

export const User = models.User || model("User", UserSchema);
