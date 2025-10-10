import express from "express"
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./utils/db_connect.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";

let app = express()
let PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "",
    credential: true
}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing",listingRouter )

app.listen(PORT, () => {
    connectDb()
    console.log("sever started");

})