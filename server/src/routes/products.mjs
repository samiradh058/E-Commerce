import { Router } from "express";
import { Product } from "../mongoose/schemas/Products.mjs";

const router = Router();

router.get("/products", async (req, res) => {
  console.log("IT IS RUNNING");
  try {
    const products = await Product.find();
    console.log(products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
