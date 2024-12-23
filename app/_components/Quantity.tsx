"use client";

import { useState } from "react";

export default function Quantity() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex gap-4">
      <h2>Quantity:</h2>
      <div className="flex">
        <button
          className="px-2 bg-green-400"
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        >
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button
          className="px-2 bg-yellow-400"
          onClick={() => setQuantity(quantity < 10 ? quantity + 1 : quantity)}
        >
          +
        </button>
      </div>
    </div>
  );
}
