import { useState } from "react";
import { updateQuantity } from "../_utils/products";

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

  async function handleUpdateQuantity(action: "increase" | "decrease") {
    const updatedQuantity = await updateQuantity(productId, action);
    if (updatedQuantity !== undefined) {
      setQuantity(updatedQuantity);
      onQuantityChange(updatedQuantity);
    }
  }

  return (
    <div className="flex gap-4">
      <h2>Quantity:</h2>
      <div className="flex gap-1">
        <button
          className="px-2 bg-green-400 rounded-lg"
          onClick={() => handleUpdateQuantity("decrease")}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button
          className="px-2 bg-yellow-400 rounded-lg"
          onClick={() => handleUpdateQuantity("increase")}
        >
          +
        </button>
      </div>
    </div>
  );
}
