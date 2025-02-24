import { Router } from "express";
import { Product } from "../mongoose/products.mjs";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
});

router.get("/cart", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, Login first!" });
    }
    return res.status(200).json({
      message: "Cart route hit, message sent from backend",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

export default router;
