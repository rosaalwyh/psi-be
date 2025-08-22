import express from "express";
import AuthController from "../../controllers/auth";
import { authMiddleware } from "../../middlewares";
const authRouter = express();

authRouter.post("/login", AuthController.login);
authRouter.get("/google", AuthController.googleLogin);
authRouter.get("/google-callback", AuthController.callbackGoogle);
authRouter.get("/get-profile", authMiddleware, AuthController.getProfile);

export default authRouter;
