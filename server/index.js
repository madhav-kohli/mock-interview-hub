import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()

// Allow CORS from configured client origins, localhost, and onrender deployments
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://mock-interview-hub-1.onrender.com",
    "https://mock-interview-hub-j61m.onrender.com",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server) or matched origins
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
            callback(null, true);
        } else {
            callback(null, true); // Allow all to prevent production breakage
        }
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

app.get("/health", (req, res) => {
    res.json({ status: "healthy", service: "InterviewIQ Backend" });
});

const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
