const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Bypassed Authentication - Always Logged In
app.post("/login", (req, res) => {
    console.log("✅ Bypassing login, auto-authenticating...");
    
    return res.json({
        token: "bypassed_token_12345",
        role: "mentor", // Change to "mentee" or "admin" if needed
        msg: "Login bypassed successfully!"
    });
});

// Routes (Uncomment if needed)
// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Server is running with login bypass!");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
