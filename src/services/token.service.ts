import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import { ITokenPayload, ITokensPair } from "../types/token.types";

class TokenService {
  public async generateTokenPair(payload: ITokenPayload): Promise<ITokensPair> {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "4h",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public async generateActionToken(payload: ITokenPayload): string {
    return jwt.sign(payload, configs.JWT_ACTION_SECRET, {
      expiresIn: "1d",
    });
  }
  public checkActionToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, configs.JWT_ACTION_SECRET) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

export const tokenService = new TokenService();
