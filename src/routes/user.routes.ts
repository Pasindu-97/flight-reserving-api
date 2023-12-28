import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserController from "../controllers/user.controllers";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

export const userRouter = express.Router();

userRouter.get("/", AuthenticationMiddleware("ADMIN"), UserController.getUsers);
userRouter.get("/detail", UserController.getUserdetail);

userRouter.get(
  "/:id",
  AuthenticationMiddleware("ADMIN"),
  UserController.getUser
);

userRouter.post(
  "/",
  body("username").isString(),
  body("email").isString(),
  body("password").isString(),
  body("role").isString(),
  UserController.createUser
);

userRouter.put(
  "/:id",
  AuthenticationMiddleware("ADMIN"),
  body("username").isString(),
  body("email").isString(),
  body("password").isString(),
  body("role").isString(),
  UserController.updateUser
);

userRouter.delete(
  "/:id",
  AuthenticationMiddleware("ADMIN"),
  UserController.deleteUser
);
