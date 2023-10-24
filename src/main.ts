import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs/config";
// import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));
// app.use("/cars", authRouter);

app.use(
  (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.status || 500;

    res.status(status).json({
      message: error.message,
      status: error.status,
    });
  },
);

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  // cronRunner();
  // eslint-disable-next-line no-console
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});

// CRUD c - create, r - read, u - update, d - delete
