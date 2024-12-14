import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB.js";
import { router as authRouter } from "./routes/user.route.js";
import { router as medicineRouter } from "./routes/medicine.route.js";
import { router as logRouter } from "./routes/log.route.js";
import { router as adminRouter } from "./routes/admin.router.js";
dotenv.config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "https://medicine-remainder.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/medicine", medicineRouter);
app.use("/api/log", logRouter);
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("database connection failed", err);
  });
