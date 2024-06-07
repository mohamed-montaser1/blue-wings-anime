import { Schema, model, models } from "mongoose";

export type UserRole = "user" | "admin" | "artist" | "editor";
export interface User {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  bio: string;
  image: string;
  cover: string;
  password: string;
  role: UserRole;
  discord: string;
  email_verified: boolean;
  createdAt: number;
}

const UserSchema = new Schema<User>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
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
    createdAt: {
      type: Number,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

export default models.User ?? model("User", UserSchema);
