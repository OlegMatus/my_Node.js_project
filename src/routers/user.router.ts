import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { filesMiddleware } from "../middlewares/files.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
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
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);
router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateUser,
);
router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.deleteUser,
);
router.post(
  "/:userId/avatar",
  filesMiddleware.isAvatarValid,
  userController.uploadAvatar,
);
export const userRouter = router;
