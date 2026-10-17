import genToken from "../config/token.js"
import User from "../models/user.model.js"

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required for authentication." })
        }
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name: name || "Candidate",
                email,
                credits: 200
            })
        }
        let token = await genToken(user._id)
        
        // Use standard httpOnly cookie with permissive SameSite for cross-domain support
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Return user and token in response body for reliable cross-origin fallback
        const userData = user.toObject ? user.toObject() : user;
        return res.status(200).json({
            ...userData,
            token
        })
    } catch (error) {
        return res.status(500).json({ message: `Google auth error: ${error.message || error}` })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        })
        return res.status(200).json({ message: "LogOut Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Logout error: ${error.message || error}` })
    }
}
