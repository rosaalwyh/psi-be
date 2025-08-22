import express from "express";
import authRouter from "./auth";
import userRouter from "./users";
import eCommerceRouter from "./e-commerce";

const router = express();

router.use("/", authRouter);
router.use("/users", userRouter);
router.use("/eCommerce", eCommerceRouter);

export default router;
