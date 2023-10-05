// import { NextFunction, Request, Response } from "express";
//
// import { authService } from "../services/auth.service";
//
// class AuthController {
//   public async register(
//     req: Request,
//     _res: Response,
//     next: NextFunction,
//   ): Promise<Response<void>> {
//     try {
//       await authService.register(req.body);
//     } catch (e) {
//       next(e);
//     }
//   }
//   public login() {}
// }
//
// export const authController = new AuthController();
