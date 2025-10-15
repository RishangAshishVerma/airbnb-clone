import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
import { sendmail } from "../utils/nodemaler.js";

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

        const subject = `Welcome to Airbnb Clone, ${name}! 🏡`;
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #FF385C;">Hello, ${name}!</h2>
        <p>Thanks for signing up on our Airbnb Clone.</p>
        <p>You can now explore listings and enjoy the app 🚀</p>
      </div>
    `;

        console.log("📧 Sending dynamic email to:", email);
        await sendmail(email, subject, "Welcome to Airbnb Clone!", htmlContent);


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

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(201).json({
            message: "logout successful"
        });
    } catch (error) {
        return res.status(200).json({ message: `logout error ${error} ` });
    }
}

export const deleteUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.isDeleted) return res.status(400).json({ message: "User account is already deleted" });

        user.isDeleted = true;
        user.deletedAt = new Date();
        await user.save();

        res.status(200).json({ message: "User deleted ." });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Temporary in-memory OTP storage
const otpStore = {}; // it will store eamil and opt and time more scure

// Step 1: Request OTP
export const requestOtp = async (req, res) => {
    try {
        const { email } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

    
        const otp = Math.floor(1000 + Math.random() * 9000);
        otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

      
        const subject = "Reset Password OTP";
        const htmlContent = `<h3>Your OTP is: ${otp}</h3><p>Valid for 5 minutes.</p>`;
        await sendmail(email, subject, `Your OTP is ${otp}`, htmlContent);

        return res.status(200).json({ message: "OTP sent successfully ✅" });
    } catch (error) {
        return res.status(500).json({ message: `Error sending OTP: ${error.message}` });
    }
};

// Step 2: Verify OTP & reset password
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const record = otpStore[email];
        if (!record) return res.status(400).json({ message: "No OTP found. Request a new one." });

        if (Date.now() > record.expires) {
            delete otpStore[email];
            return res.status(400).json({ message: "OTP expired. Request a new one." });
        }

        if (parseInt(otp) !== record.otp) {
            return res.status(400).json({ message: "Invalid OTP ❌" });
        }

        // OTP verified → update password
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashPassword });

        delete otpStore[email]; 

        return res.status(200).json({ message: "Password reset successfully ✅" });
    } catch (error) {
        return res.status(500).json({ message: `Error resetting password: ${error.message}` });
    }
};

