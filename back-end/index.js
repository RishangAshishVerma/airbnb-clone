import express from "express"
import dotenv from "dotenv";

dotenv.config();

let app = express()
let PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
    res.send("hello from sever")
})

app.listen(PORT, () => {
    console.log("sever started");

})