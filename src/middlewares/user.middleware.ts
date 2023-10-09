import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  public async isEmailUniq(req: Request, _res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await userRepository.getOneByParams({ email });
      if (user) {
        throw new ApiError("Email already exist", 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
  public async getByIdOrThrow(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const user = await userRepository.findById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      req.res.locals = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();