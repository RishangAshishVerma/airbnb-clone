import Listing from "../model/listing.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const addListing = async (req, res) => {
    try {
        let host = req.userId
        let { title, description, rent, city, landMark, category } = req.body
        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image1[0].path)
        let image3 = await uploadOnCloudinary(req.files.image1[0].path)

        let listing = await Listing.create({
            title,
            description,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
            host

        })
        res.status(201).json(listing)
    } catch (error) {
        res.status(500).json({ message: `there is some erro while creating the lsting ${error}` })
    }
}
