import User from "../model/user.model.js"


export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password").populate(
            "listing", "title description rent city landMark category image1 image2 image3"
        )
        if (!user) {
            return res.status(400).json({ message: `user not found  ` })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `get current user eerror ${error}  ` })
    }
}
