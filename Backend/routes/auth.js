const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const router = express.Router();

// ✅ Register Mentor or Mentee
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("🔍 Checking if user already exists:", email);

    // Check if user already exists in either collection
    let existingUser = await Mentor.findOne({ email }) || await Mentee.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists!");
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user;
    if (role === "mentor") {
      user = new Mentor({ name, email, password: hashedPassword });
    } else if (role === "mentee") {
      user = new Mentee({ name, email, password: hashedPassword });
    } else {
      return res.status(400).json({ msg: "Invalid role" });
    }

    await user.save();
    console.log("✅ User registered successfully!");

    res.status(201).json({ msg: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error in registration:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Login Mentor or Mentee
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Attempting login for:", email);

    // Find user in mentor or mentee collections
    let user = await Mentor.findOne({ email }) || await Mentee.findOne({ email });

    if (!user) {
      console.log("❌ User not found!");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("✅ User found:", user.email);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match!");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Determine role
    const role = await Mentor.findOne({ email }) ? "mentor" : "mentee";

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login successful! Token generated.");
    res.json({ token, role, msg: "Login successful" });

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get Current User (Protected Route)
router.get("/me", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await (decoded.role === "mentor" ? Mentor.findById(decoded.userId) : Mentee.findById(decoded.userId));

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
