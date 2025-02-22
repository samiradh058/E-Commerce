import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../mongoose/Users.mjs";

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
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const passwordCheck = await bcrypt.compare(password, existingUser.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.user = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
