import { Schema, model, models } from "mongoose";

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
    password: {
      type: String,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: "",
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
