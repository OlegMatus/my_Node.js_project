import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enums/activationTokenType.enum";
import { IActionToken } from "../types/token.types";
import { User } from "./User.model";

const tokensSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: EActionTokenType,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ActionToken = model<IActionToken>("action-token", tokensSchema);
