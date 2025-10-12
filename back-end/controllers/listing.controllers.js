import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const addListing = async (req, res) => {
    try {
        let host = req.userId
        let { title, description, rent, city, landMark, category } = req.body
        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)

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
        let user = await User.findByIdAndUpdate(
            host,
            { $push: { listing: listing._id } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: `user not found` })

        }
        res.status(201).json(listing)
    } catch (error) {
        res.status(500).json({ message: `there is some erro while creating the lsting ${error}` })
    }
}

export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find({ isDeleted: false }).sort({ createAT: -1 })
        if (!listing) {
            res.status(200).json(`liisting dose not found`)

        }
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json(`get listing error ${error}`)
    }
}

export const getUserListing = async (req, res) => {
    try {

        const userId = req.userId;
        const user = await User.findById(userId).populate({
            path: "listing",
            match: { isDeleted: false } 
        });;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.listing) {
            return res.status(200).json({ message: "No listings found for this user", listings: [] });
        }

        res.status(200).json(user.listing);
    } catch (error) {
        res.status(500).json({ message: `Get my listings error: ${error.message}` });
    }
}


export const getListingById = async (req, res) => {
    try {
        let { id } = req.params
        let listing = await Listing.findById(id)
        if (!listing) {
            res.status(200).json({ message: `listing not found` })
        }
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({ message: `find lisitng error ${error}` })

    }
}

export const deleteListing = async (req, res) => {
    try {
        let user = req.userId
        let listingId = req.params.id;
        let listing = await Listing.findById(listingId)
        if (!listing) {
            res.status(200).json({ message: `listing not found` })
        }

        if (listing.isDeleted) return res.status(400).json({ message: "already delete Listing" });

        listing.isDeleted = true;
        listing.deletedAt = new Date();

        await listing.save();

        res.status(200).json({ message: "lissting delete " });


    } catch (error) {
        res.status(500).json({ message: `listing deleting error ${error}` });
    }

}
