import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";

class UserController {
  public async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  // public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const createdUser = await userService.createUser(req.body);
  //
  //     res.status(201).json(createdUser);
  //   } catch (e) {
  //     // res.status(400).json(e.message);
  //     next(e);
  //   }
  // }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.res.locals;

      res.json(user);
    } catch (e) {
      // res.status(404).json(e.message);
      next(e);
    }
  }
}

export const userController = new UserController();
