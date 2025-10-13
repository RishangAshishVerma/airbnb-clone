import express from "express"
import isAuth from "../middleware/isAuth.middlewae.js"
import { cancelBooking, creatingBooking } from "../controllers/booking.contoller.js"

let bookingRouter = express.Router()

bookingRouter.post("/createbooking/:id",isAuth,creatingBooking)
bookingRouter.delete("/cancelbooking/:id",isAuth,cancelBooking)

export default bookingRouter