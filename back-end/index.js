import express from "express"
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./utils/db_connect.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";


let app = express()
let PORT = process.env.PORT || 5000

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)

app.listen(PORT, () => {
    connectDb()
    console.log("sever started");

})