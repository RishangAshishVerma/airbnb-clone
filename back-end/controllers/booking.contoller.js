import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

export const creatingBooking = async (req, res) => {
    try {
        let { id } = req.params
        let { checkIn, checkOut, totalRent, } = req.body

        let listing = await Listing.findById(id)
        if (!listing) {
            return res.status(404).json({ message: `listing not found ` })
        }
        if (new Date(checkIn) >= new Date(checkOut)) {
            return res.status(400).json({ message: "invalid checkIn/CheckOut date" })
        }
        if (listing.isBooked) {
            return res.status(400).json({ message: `listing is already booked` })
        }
        let booking = await Booking.create({
            checkIn,
            checkOut,
            totalRent,
            host: listing.host,
            guest: req.userId,
            listing: listing._id
        })
        
        await booking.populate("host", "email")

        let user = await User.findByIdAndUpdate(req.userId, {
            $push: { booking: listing }
        }, { new: true })

        if (!user) {
            return res.status(404).json({ message: `user not found ` })
        }
        if (!user) {
            return res.status(404).json({ message: `user not found ` })
        }
        booking.guest = req.userId
        listing.isBooked = true
        await listing.save()
        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({ message: `booking creating error ${error}` })

    }
}

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Update the lsiting 
        const listing = await Listing.findByIdAndUpdate(id, { isBooked: false }, { new: true });
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // find the bookinf 
        const booking = await Booking.findOne({ listing: id, status: "booked" });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // updaet the lsitign 
        booking.status = "cancel";
        await booking.save();

        // update the usere
        const user = await User.findByIdAndUpdate(
            booking.guest,
            { $pull: { booking: listing._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Error while canceling the booking: ${error}` });
    }
};
