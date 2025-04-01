import request from "request";
import { Router } from "express";
import { Product } from "../mongoose/products.mjs";
import { Cart } from "../mongoose/cartItem.mjs";
import { Order } from "../mongoose/orderItem.mjs";
import { User } from "../mongoose/users.mjs";
import mongoose from "mongoose";

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
    if (!req.user || req.user.role === "admin") {
      return res.status(401).json({ message: "unauthorized" });
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

  let product = await Product.findOne({ productId });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  try {
    const cartItem = new Cart({ userId, productId });
    product.quantity -= 1;
    await cartItem.save();
    await product.save();
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

    let product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (action === "increase") {
      if (product.quantity > 0) {
        cartItem.quantity += 1;
        product.quantity -= 1;
      } else {
        return res.status(400).json({ message: "Out of stock" });
      }
    } else if (action === "decrease" && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      product.quantity += 1;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await cartItem.save();
    await product.save();

    return res.status(201).json({
      message: "Quantity updated successfully",
      updatedQuantity: cartItem.quantity,
      remainingStock: product.quantity,
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

    let product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.quantity += deletedItem.quantity;
    await product.save();

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
  }
});

// Add product
router.post("/add_product", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(401).json({ message: "Only admin can add product" });
    }
    const { name, price, quantity, category, description, image, qna } =
      req.body;

    if (!name || !price || !quantity || !category || !description) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    let product = new Product({
      productId: `prod_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 5)}`,
      name,
      price,
      quantity,
      category,
      description,
      image: image || "",
      qna: qna || [],
    });
    const savedProduct = await product.save();
    return res
      .status(200)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Failed to add product" });
  }
});

// Delete product
router.delete("/delete_product", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(401).json({ message: "Only admin can delete product" });
    }
    const { productId } = req.body;
    const deletedProduct = await Product.findOneAndDelete({ productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
});

// Update product
router.put("/update_product/:productId", async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(401).json({ message: "Only admin can update product" });
    }
    const { productId } = req.params;
    const { name, price, quantity, category, description, image, qna } =
      req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      { $set: { name, price, quantity, category, description, image, qna } },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get specific cart item detail
router.get("/cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const cartProduct = await Product.findOne({
      productId: productId,
    });

    if (!cartProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartProductPrice = cartProduct.price;

    return res.status(200).json({
      cartItem: {
        _id: cartItem._id,
        quantity: cartItem.quantity,
        productId: cartItem.productId,
      },
      cartProductPrice: cartProductPrice,
    });
  } catch (error) {
    console.error("Error fetching cart item:", error);
    return res.status(500).json({ message: "Failed to fetch cart item" });
  }
});

// Get order items specific to user Id
router.get("/orders", async (req, res) => {
  if (!req.user || req.user.role === "admin") {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const orders = await Order.find({ userId: req.user._id });
    if (!orders.length) {
      return res.status(404).json({ message: "Order not found" });
    }

    const ordersWithProductNames = await Promise.all(
      orders.map(async (order) => {
        const product = await Product.findOne({ productId: order.productId });
        return {
          ...order.toObject(),
          productName: product ? product.name : "Product not found",
        };
      })
    );

    return res.status(200).json(ordersWithProductNames);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Get all ordered items
router.get("/allOrders", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const orders = await Order.find().select(
      "productId userId updatedAt createdAt receivedStatus"
    );

    console.log("orders unformatted is ", orders);

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findOne({
          _id: new mongoose.Types.ObjectId(order.userId),
        }).select("name email");
        const product = await Product.findOne({
          productId: order.productId,
        }).select("name");

        return {
          productName: product?.name || "Unknown Product",
          userName: user?.name || "Unknown User",
          userEmail: user?.email || "No Email",
          orderDate: order.createdAt,
          updatedDate: order.updatedAt,
          receivedStatus: order.receivedStatus || false,
        };
      })
    );
    if (!formattedOrders.length) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ message: "Failed to fetch all orders" });
  }
});

// Change received status of order
router.patch("/update-order-status", async (req, res) => {
  const transaction_id = req.body.transactionId;
  const status = req.body.receivedStatus;
  const userId = req.user._id;

  if (!transaction_id || !userId || status === undefined) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const order = await Order.findOne({
      userId: userId,
      transactionId: transaction_id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.receivedStatus = !status;
    await order.save();

    return res
      .status(200)
      .json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Failed to update order status" });
  }
});

// Buy product (Khalti)
router.post("/cart/buy", async (req, res) => {
  try {
    const { userId, productId, total, name, email, address, phone } = req.body;

    const options = {
      method: "POST",
      url: "https://dev.khalti.com/api/v2/epayment/initiate/",
      headers: {
        Authorization: `Key ${process.env.LIVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: "http://localhost:3000/payment-success",
        website_url: "http://localhost:3000/",
        amount: total * 100,
        purchase_order_id: `Order_${Date.now()}`,
        purchase_order_name: productId,
        customer_info: {
          userId,
          name,
          email,
          phone,
          address,
        },
      }),
    };

    // Send request to Khalti API
    request(options, (error, response, body) => {
      if (error) {
        console.error("Error initiating payment:", error);
        return res.status(500).json({ message: "Payment initiation failed" });
      }

      const responseData = JSON.parse(body);

      if (response.statusCode === 200) {
        res.json({ success: true, payment_url: responseData.payment_url });
      } else {
        res.status(response.statusCode).json({
          success: false,
          message: responseData.detail || "Payment failed",
        });
      }
    });
  } catch (error) {
    console.error("Error buying product:", error);
    res.status(500).json({ message: "Failed to buy product" });
  }
});

// Verify payment and add data in Order table
router.post("/cart/verify-payment", async (req, res) => {
  try {
    const { pidx, purchase_order_name } = req.body;

    if (!pidx) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment details." });
    }

    const response = await fetch(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.LIVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pidx }),
      }
    );

    const data = await response.json();

    if (response.ok && data.status === "Completed") {
      const { transaction_id, total_amount, status } = data;

      if (!req.user._id || !transaction_id || !total_amount || !status) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed.",
          data,
        });
      }

      const existingOrder = await Order.findOne({
        transactionId: transaction_id,
      });

      if (existingOrder) {
        return res.status(400).json({
          success: false,
          message: "Order with this transaction ID already exists.",
          order: existingOrder,
        });
      }

      const cartItem = await Cart.findOne({
        userId: req.user._id,
        productId: purchase_order_name,
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found in cart" });
      }

      const { quantity } = cartItem;

      let order = new Order({
        userId: req.user._id,
        productId: purchase_order_name,
        transactionId: transaction_id,
        totalAmount: total_amount,
        paymentStatus: status.toLowerCase(),
        quantity,
      });

      await order.save();

      const deleteCartItem = await Cart.findOneAndDelete({
        userId: req.user._id,
        productId: purchase_order_name,
      });

      if (!deleteCartItem) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found in cart" });
      }

      return res.json({
        success: true,
        message: "Payment verified successfully!",
        data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
        data,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

export default router;
