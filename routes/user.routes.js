import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;