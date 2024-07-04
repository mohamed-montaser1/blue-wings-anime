import { Schema, model, models } from "mongoose";
import { TPost } from "./Post";
import DateController from "@/utils/date";

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
}

const UserSchema = new Schema<TUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      trim: true,
    },
    slug_name: {
      type: String,
      trim: true,
      lower: true,
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
      default: "/uploads/profiles-pictures/default.jpg",
    },
    cover: {
      type: String,
      default: "/uploads/profiles-covers/default.jpg",
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
    createdAt: {
      type: Number,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

UserSchema.methods.createdFromNow = function (createdAt: number) {
  const date_controller = new DateController(createdAt);
  return date_controller.fromNow();
};

export const User = models.User || model("User", UserSchema);
// export const User = model("User", UserSchema);
