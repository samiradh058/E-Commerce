import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  quantity: {
    type: mongoose.Schema.Types.Number,
    default: 1,
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
