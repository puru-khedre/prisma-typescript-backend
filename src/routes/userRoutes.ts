import { Router } from "express";
import { login, logout, signup } from "../controllers/userControllers";

const userRouter: Router = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;
