import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";

import { userController } from "../controllers/user.controller";
import { ApiError } from "../errors/api.error";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { User } from "../models/User.model";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.createUser,
);
router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new ApiError("Not Valid ID", 400);
    }
    const { error, value } = UserValidator.update.validate(req.body);
    if (!error) {
      throw new ApiError(error.message, 400);
    }
    const user = await User.findByIdAndUpdate(id, value, {
      returnDocument: "after",
    });
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not Valid ID", 400);
      }
      const user = await User.findById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      await User.deleteOne({ _id: id });

      res.sendStatus(204);
    } catch (e) {
      // res.status(404).json(e.message);
      next(e);
    }
  },
);
export const userRouter = router;
