import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public async isIdValid(req: Request, _res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not Valid ID", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
