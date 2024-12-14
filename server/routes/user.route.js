import Router from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  getUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/user.middleware.js";

export const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/refresh-token").post(refreshToken);

router.route("/logout").post(authUser, logout);

router.route("/getuser/:id").get(authUser, getUser);
