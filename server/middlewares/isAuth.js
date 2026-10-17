import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies?.token;

        // Support Authorization: Bearer <token> fallback for cross-origin / iframe environments
        if (!token && req.headers?.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "No authentication token provided" })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(401).json({ message: "Invalid or expired authentication token" })
        }

        req.userId = verifyToken.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: `Authentication error: ${error.message || error}` })
    }
}

export default isAuth
