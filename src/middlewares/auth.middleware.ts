import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkRefreshToken(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("Not Token", 401);
      }

      const payload = await tokenService.checkToken(refreshToken);

      const entity = await tokenRepository.findOne({ refreshToken });
      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals.payloadToken = payload;

      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
