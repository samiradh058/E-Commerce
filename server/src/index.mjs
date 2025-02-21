import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.mjs";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => console.log(err));

app.use(routes);

// Creating product
// const createProduct = async () => {
//   const newProduct = new Product({
//     name: "Smartphone",
//     price: 699.99,
//     quantity: 150,
//     image: "https://example.com/smartphone.jpg",
//     category: "All",
//     description: "Cost efficient smart phone",
//   });

//   try {
//     const savedProduct = await newProduct.save();
//     console.log("Product saved:", savedProduct);
//   } catch (err) {
//     console.error("Error saving product:", err);
//   }
// };
// createProduct();

// Fetch all products
/* Product.find()
  .then((products) => {
    console.log("All Products:", products);
  })
  .catch((err) => {
    console.error("Error fetching products:", err);
  });
*/

// app.get("/api/home", (req, res) => {
//   res.json({ message: "Hello World" });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
