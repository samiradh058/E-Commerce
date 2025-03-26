import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.String,
    required: true,
    index: true,
  },
  productId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  transactionId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  quantity: {
    type: mongoose.Schema.Types.Number,
    default: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["completed", "pending", "user canceled"],
    default: "completed",
  },
  receivedStatus: {
    type: Boolean,
    default: false,
  },
  transactionId: {
    type: mongoose.Schema.Types.String,
    required: true,
    index: true,
  },
  paymentMethod: {
    type: String,
    default: "Khalti",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Order = mongoose.model("Order", orderSchema);
