import { Router } from "express";
import { Product } from "../mongoose/Products.mjs";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/cart", async (req, res) => {
  console.log("Cart route hit");
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized, Login first!" });
    }
    res.json({ message: "Cart route hit", user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

export default router;
