import express from "express";
import {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicine.controller.js";
import { authUser } from "../middlewares/user.middleware.js";

export const router = express.Router();

router.route("/create").post(authUser, createMedicine);

router.route("/get").get(authUser, getMedicines);

router.route("/update/:id").put(authUser, updateMedicine);

router.route("/delete/:id").delete(authUser, deleteMedicine);
