import { Schema, model, models } from "mongoose";
import { TUser, UserRole } from "./User";

export interface TChangeRoleRequest {
  _id: Schema.Types.ObjectId;
  user: TUser;
  role: UserRole;
  newRole: UserRole;
  requestDate: number;
}

const ChangeRoleRequestSchema = new Schema<TChangeRoleRequest>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      enum: ["admin", "artist", "editor", "user"],
      required: true,
    },
    newRole: {
      type: String,
      enum: ["admin", "artist", "editor", "user"],
      required: true,
    },
    requestDate: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ChangeRoleRequest =
  models.ChangeRoleRequest ||
  model("ChangeRoleRequest", ChangeRoleRequestSchema);
