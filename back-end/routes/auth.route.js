import express from 'express';
import { deleteUserByEmail, requestOtp,resetPassword, logIn, logOut, signUp,updateName } from '../controllers/auth.controller.js';
import isAuth from '../middleware/isAuth.middlewae.js';

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.get("/login", logIn);
authRouter.post("/requestotp", requestOtp);
authRouter.post("/updatename",isAuth ,updateName);
authRouter.post("/resetpassword", resetPassword);
authRouter.get("/logout", isAuth, logOut);
authRouter.delete("/delete", isAuth, deleteUserByEmail);

export default authRouter