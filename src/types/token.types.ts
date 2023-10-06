import { Types } from "mongoose";

export interface ITokenPayload {
  userId: Types.ObjectId;
  name: string;
}
export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}
