import { Schema, model, models } from "mongoose";
import path from "path";

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
  ARTIST = "artist",
  EDITOR = "editor",
}

export interface User {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  avatar: string;
  password: string;
  role: "user" | "admin" | "artist" | "editor";
  discord: string;
  email_verified: boolean;
}

const UserSchema = new Schema<User>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minlength: 10,
    },
    avatar: {
      type: String,
      default: "default-profile.jpeg",
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
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
