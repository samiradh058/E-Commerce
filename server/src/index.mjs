import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import routes from "./routes/index.mjs";
import "./strategies/passport.mjs";

const app = express();
const PORT = 8080;

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => console.log(err));

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

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
//     qna: [{ question: "How is it", answer: "Good" }],
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
