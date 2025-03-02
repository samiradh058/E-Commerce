import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../mongoose/users.mjs";
import passport from "passport";

const router = Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const origin = req.headers.origin;

    // Restrict admin login to port 3001
    if (origin === "http://localhost:3000" && req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins cannot log in from this port" });
    }

    // Restrict user login to port 3000
    if (origin === "http://localhost:3001" && req.user.role === "user") {
      return res
        .status(403)
        .json({ message: "Users cannot log in from this port" });
    }

    res.status(200).json({
      message: `${req.user.role} login successful`,
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    console.error("Error occurred during logout", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
