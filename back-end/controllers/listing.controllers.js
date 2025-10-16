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
            return res.status(404).json({ message: `user not found` })
        }

        res.status(201).json(listing)
    } catch (error) {
        res.status(500).json({ message: `there is some erro while creating the lsting ${error}` })
    }
}

export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find({ isDeleted: false }).sort({ createdAt: -1 })
        if (!listing) {
            return res.status(404).json(`liisting dose not found`)
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
        });

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
            return res.status(404).json({ message: `listing not found` })
        }
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({ message: `find lisitng error ${error}` })
    }
}

export const updateListing = async (req, res) => {
    try {
        let image1
        let image2
        let image3
        let id = req.params
        let { title, description, rent, city, landMark, category } = req.body
        if (req.files.image1) {
            image1 = await uploadOnCloudinary(req.files.image1[0].path)
        }
        if (req.files.image2) {
            image2 = await uploadOnCloudinary(req.files.image2[0].path)
        }
        if (req.files.image3) {
            image3 = await uploadOnCloudinary(req.files.image3[0].path)
        }

        let listing = await Listing.findByIdAndUpdate(id, {
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

        }, { new: true })
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({ message: `error while updateing the list ${error}` })
    }
}

export const deleteListing = async (req, res) => {
    try {
        let listingId = req.params.id;
        let listing = await Listing.findById(listingId)
        let user = await User.findByIdAndUpdate(listing.host, {
            $pull: { listing: Listing._id }
        }, { new: true })
        if (!user) {
            return res.status(404).json({ message: `user not found` })
        }

        if (!listing) {
            return res.status(404).json({ message: `listing not found` })
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

export const ratingListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        const Rating = Number(rating);
        if (isNaN(Rating)) {
            return res.status(400).json({ message: "Invalid rating value" });
        }

        listing.ratings = Rating;

        await listing.save();

        return res.status(200).json({ rating: listing.ratings });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: `Error while updating the listing: ${error.message}` });
    }
};


export const search = async (req, res) => {
    try {

        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: `search query is required` })
        }

        const lisitng = await Listing.find({
            $or: [
                { landMark: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { title: { $regex: query, $options: "i" } },
            ]
        })
        return res.status(200).json(lisitng)

    } catch (error) {
        return res.status(500).json({ message: `search query error ${error}` })
    }
}
