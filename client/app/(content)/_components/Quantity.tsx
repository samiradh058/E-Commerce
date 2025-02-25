"use client";

import { useState } from "react";

export default function Quantity({
  productId,
  initialQuantity,
  onQuantityChange,
}: {
  productId: string;
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  async function updateQuantity(action: "increase" | "decrease") {
    try {
      const res = await fetch("http://localhost:8080/cart/update", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, action }),
      });

      if (res.ok) {
        const { updatedQuantity } = await res.json();
        setQuantity(updatedQuantity);
        onQuantityChange(updatedQuantity);
      } else {
        console.error("Error updating quantity");
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  }

  return (
    <div className="flex gap-4">
      <h2>Quantity:</h2>
      <div className="flex gap-1">
        <button
          className="px-2 bg-green-400 rounded-lg"
          onClick={() => updateQuantity("decrease")}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button
          className="px-2 bg-yellow-400 rounded-lg"
          onClick={() => updateQuantity("increase")}
        >
          +
        </button>
      </div>
    </div>
  );
}
