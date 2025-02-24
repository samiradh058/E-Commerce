import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
// import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import routes from "./routes/index.mjs";
import "./strategies/passport.mjs";

const app = express();
const PORT = 8080;

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => console.log(err));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: "samir",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
