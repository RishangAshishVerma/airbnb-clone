import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    listing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }],

    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking"
    }],

    isDeleted: {
        type: Boolean,
        default: false
    },

    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User