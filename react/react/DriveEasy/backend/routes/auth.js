const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Secret used to sign the tokens (set in the .env file)
const JWT_SECRET = process.env.JWT_SECRET || "driveeasy-demo-secret";

// Creates a JWT token that is valid for 7 days
function createToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// The safe version of a user (no password hash is ever sent to the browser)
function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}

// ---------- POST /api/auth/register ----------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in name, email and password." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Check if the email is already registered
    const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        message: "An account with this email already exists. Please log in instead.",
      });
    }

    // Hash the password and create the account
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      password: hashed,
    });

    res.status(201).json({
      message: "Account created successfully!",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Could not create the account. Please try again." });
  }
});

// ---------- POST /api/auth/login ----------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter your email and password." });
    }

    // Find the account and compare the password with the stored hash
    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password." });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({ message: "Wrong email or password." });
    }

    res.json({
      message: "Login successful!",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Could not log you in. Please try again." });
  }
});

module.exports = router;