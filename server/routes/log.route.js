import { Router } from "express";
import {
  createLog,
  getLogs,
  getLogById,
  updateLog,
  deleteLog,
} from "../controllers/log.controller.js";
import { authUser } from "../middlewares/user.middleware.js";

export const router = Router();

router.route("/createlogs").post(authUser, createLog);

router.route("/getlogs").get(authUser, getLogs);

router.route("/getlogs/:id").get(authUser, getLogById);

router.route("/updatelogs/:id").put(authUser, updateLog);

router.route("/deletelogs/:id").delete(authUser, deleteLog);
