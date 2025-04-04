import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () =>
      `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  qna: {
    type: Array,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  review: {
    type: Array,
    required: false,
  },
  brand: {
    type: String,
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
