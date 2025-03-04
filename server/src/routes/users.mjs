import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../mongoose/users.mjs";
import passport from "passport";
import { Admin } from "../mongoose/admins.mjs";

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
router.post("/login", (req, res, next) => {
  console.log("Login path");
  passport.authenticate("local", async (err, user, info) => {
    if (err) return res.status(500).json({ message: "Login failed" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });

      return res.status(200).json({
        message: `${user.role} login successful`,
        role: user.role,
      });
    });
  })(req, res, next);
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

// Add Admin
router.post("/add_admin", async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can add new admins" });
    }

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    res.status(201).json({ message: "New admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create admin" });
  }
});

export default router;
