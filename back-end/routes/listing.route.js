import express from "express"
import isAuth from "../middleware/isAuth.middlewae.js"
import upload from "../middleware/multer.middleware.js"
import { addListing, deleteListing, getListing, getListingById, getUserListing, ratingListing, search, updateListing } from "../controllers/listing.controllers.js"

let listingRouter = express.Router()

listingRouter.post("/add", isAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
]), addListing)

listingRouter.get("/get", getListing)
listingRouter.get("/userlisting", isAuth, getUserListing)
listingRouter.get("/getlistingbyid/:id", isAuth, getListingById)
listingRouter.get("/delete/:id", isAuth, deleteListing)
listingRouter.post("/rating/:id", isAuth, ratingListing)
listingRouter.get("/search",search)

listingRouter.get("/update/:id", isAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
]), updateListing)


export default listingRouter        