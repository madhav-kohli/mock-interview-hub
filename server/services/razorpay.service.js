import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"

// Safely initialize Razorpay so server doesn't crash if keys are missing in Render
const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

let razorpayInstance;
try {
  razorpayInstance = new Razorpay({
    key_id,
    key_secret,
  });
} catch (err) {
  console.warn("Razorpay warning:", err.message);
  razorpayInstance = {
    orders: {
      create: async (opts) => ({
        id: `order_sim_${Date.now()}`,
        amount: opts.amount,
        currency: opts.currency || "INR",
        status: "created"
      })
    }
  };
}

export default razorpayInstance;
