import { Router } from "express";
import auth from '../auth/auth.service.js';
import { changeBusinessStatus, deleteUser, editUser, getAllUsers, getUser, loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', auth, getAllUsers);
userRouter.get('/:id', auth, getUser);
userRouter.put('/:id', auth, editUser);
userRouter.patch('/:id', auth, changeBusinessStatus);
userRouter.delete('/:id', auth, deleteUser);

export default userRouter;