import { Router } from "express";
import { Product } from "../mongoose/products.mjs";
import { Cart } from "../mongoose/cartItem.mjs";

const router = Router();
// Fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get individual product by ID
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

// Adding question for a product
router.post("/product/qna", async (req, res) => {
  console.log("Product/ qna hit");
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, Login first!" });
    }
    const { productId, question } = req.body;

    if (!productId || !question.trim()) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Product ", product);
    console.log("Question to push :", { question, answer: "" });
    product.qna.push({ question, answer: "" });
    await product.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add question" });
  }
});

// Fetch cart items
router.get("/cart", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, Login first!" });
    }
    const cart = await Cart.find({ userId: req.user._id });
    if (!cart.length) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cartItems = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findOne({ productId: item.productId });
        return {
          productId: item.productId,
          name: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
        };
      })
    );

    console.log("Cart items:", cartItems);
    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// Adding items to cart
router.post("/cart", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized, Login first!" });
  }
  const userId = req.user._id;

  const { productId } = req.body;

  try {
    const cartItem = new Cart({ userId, productId });
    await cartItem.save();
    return res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

//Updating quantity of cart
router.put("/cart/update", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, Login first!" });
    }
    const { productId, action } = req.body;
    const userId = req.user._id;

    let cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (action === "increase") {
      cartItem.quantity += 1;
    } else if (action === "decrease" && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
    console.log("Updated quantity before saving:", cartItem.quantity);

    await cartItem.save();
    return res.status(201).json({
      message: "Quantity updated successfully",
      updatedQuantity: cartItem.quantity,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Failed to update cart item" });
  }
});

// Deleting items from cart
router.delete("/cart/delete", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, Login first!" });
    }
    const { productId } = req.body;
    const userId = req.user._id;
    const deletedItem = await Cart.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
  }
});

export default router;
