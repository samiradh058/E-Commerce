import { Router } from "express";
import bcrypt from "bcrypt";

// import { validationResult } from "express-validator";
import { User } from "../mongoose/Users.mjs";

const router = Router();

//Signup

router.post("/signup", async (req, res) => {
  console.log("Signup route hit");
  try {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with provided email address already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

//Login

router.post("/login", async (req, res) => {
  console.log("Login route hit");
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("Not found user");
      return res.status(400).json({ message: "User does not exist" });
    }

    const passwordCheck = await bcrypt.compare(password, existingUser.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Invalid password" });
    }
    return res
      .status(201)
      .json({ message: "Login Successful", user: existingUser });
  } catch (error) {
    console.log("Error occured in login route", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
