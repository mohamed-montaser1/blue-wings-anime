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
  role: string;
  discord: string;
}

const UserSchema = new Schema<User>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    username: {
      type: String,
      required: [true, "يجب أن تدخل اسم مستخدم صالح"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "يجب أن تدخل الإيميل الخاص بك"],
      trim: true,
      lowercase: true,
      match: [
        /^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
        "من فضلك أدخل أيميل صالح",
      ],
    },
    password: {
      type: String,
      required: [true, "يجب أن تدخل كلمة السر لحسابك"],
      minlength: 8,
    },
    avatar: {
      type: String,
      required: [true, "يجب إدخال صورة مستخدم"],
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
