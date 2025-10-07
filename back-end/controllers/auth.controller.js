import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existeduser = await User.findOne({ email });
        if (existeduser) {
            return res.status(200).json({ message: "User already exists" });
        }

        let hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ message: `signup error ${error}` })
    }
}

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;


        const existeduser = await User.findOne({ email });

        if (!existeduser) {
            return res.status(200).json({ message: "User does not exist" });
        }


        let isMatch = await bcrypt.compare(password, existeduser.password);

        if (!isMatch) {
            return res.status(200).json({ message: "Incorrect password" });
        }

        let token = await genToken(existeduser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            user: existeduser,
            message: "Login successful"
        });

    } catch (error) {
        return res.status(200).json({ message: `login error ${error} ` });
    }
}

export const logOut = async (req,res)=>{
    try {
        res.clearCookie("token")
         return res.status(201).json({
            message: "logout successful"
        });
    } catch (error) {
         return res.status(200).json({ message: `logout error ${error} ` });
    }
}