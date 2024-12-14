import { Router } from "express";
import {
  adminPanel,
  getFilteredLogs,
} from "../controllers/admin.controller.js";
import { authAdmin, authUser } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/").get(authUser, authAdmin, adminPanel);

router.route("/filtered").get(authUser, authAdmin, getFilteredLogs);

export { router };
