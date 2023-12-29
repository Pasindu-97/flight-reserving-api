import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserController from "../controllers/user.controllers";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

export const userRouter = express.Router();

userRouter.get("/", AuthenticationMiddleware("USER"), UserController.getUsers);
userRouter.get("/detail", UserController.getUserdetail);

userRouter.get(
  "/:id",
  AuthenticationMiddleware("USER"),
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
  AuthenticationMiddleware("USER"),
  body("username").isString(),
  body("email").isString(),
  body("password").isString(),
  body("role").isString(),
  UserController.updateUser
);

userRouter.delete(
  "/:id",
  AuthenticationMiddleware("USER"),
  UserController.deleteUser
);
