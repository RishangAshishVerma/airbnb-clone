import express from "express"
import { getCurrentUser} from "../controllers/user.controller.js"
import isAuth from "../middleware/isAuth.middlewae.js"

let userRouter = express.Router()

userRouter.get("/currentuser", isAuth, getCurrentUser)

export default userRouter