import express from "express";
import authRouter from "./auth";
import userRouter from "./users";

const router = express();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
