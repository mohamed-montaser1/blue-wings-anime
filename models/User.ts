import { Schema, model, models } from "mongoose";

interface TUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  artist: boolean;
  admin: boolean;
}

const UserSchema = new Schema<TUser>(
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
    artist: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
