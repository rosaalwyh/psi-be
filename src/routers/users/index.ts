import express from "express";
import UserController from "../../controllers/users";

const userRouter = express();

userRouter.get("/", UserController.getList);
userRouter.get("/random-user", UserController.getUsers);

export default userRouter;
