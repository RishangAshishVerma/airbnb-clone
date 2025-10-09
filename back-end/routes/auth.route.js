import express from 'express';
import { deleteUserByEmail, logIn, logOut, signUp } from '../controllers/auth.controller.js';
import isAuth from '../middleware/isAuth.middlewae.js';

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.get("/login", logIn);
authRouter.get("/logout", isAuth, logOut);
authRouter.delete("/delete", isAuth, deleteUserByEmail);

export default authRouter