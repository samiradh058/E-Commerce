"use client";

import Buy from "./Buy";
import DeleteCartItem from "./DeleteCartItem";
import Quantity from "./Quantity";
import { deleteCartItem } from "../_utils/products";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_customHooks/useAuth";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartTableUI({
  cartItems,
  setCartItems,
}: {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) {
  const router = useRouter();

  function handleQuantityChange(productId: string, newQuantity: number) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  async function handleDelete(productId: string) {
    const success = await deleteCartItem(productId);
    if (success) {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.productId !== productId)
      );
      router.refresh();
    }
  }

  const { user } = useAuth();

  if (user?.role === "admin") {
    return;
  }

  if (!cartItems.length) return;

  return (
    <div className="p-6">
      <div className="w-full md:w-[90%] lg:w-[80%] mx-auto p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Items in Your Cart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800 text-center">
                <th className="p-3 border border-gray-300">Name</th>
                <th className="p-3 border border-gray-300">Unit Price</th>
                <th className="p-3 border border-gray-300">Total Price</th>
                <th className="p-3 border border-gray-300">
                  Price with Delivery
                </th>
                <th className="p-3 border border-gray-300">Quantity</th>
                <th className="p-3 border border-gray-300">Delete</th>
                <th className="p-3 border border-gray-300">Buy</th>
                <th className="p-3 border border-gray-300">Rate</th>
                <th className="p-3 border border-gray-300">Review</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-3 border border-gray-300">{item.name}</td>
                  <td className="p-3 border border-gray-300">
                    Rs. {item.price}
                  </td>
                  <td className="p-3 border border-gray-300">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-3 border border-gray-300">
                    Rs. {(item.price * item.quantity + 50).toFixed(2)}
                  </td>
                  <td className="p-3 border border-gray-300 justify-center">
                    <Quantity
                      productId={item.productId}
                      initialQuantity={item.quantity}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(item.productId, newQuantity)
                      }
                    />
                  </td>
                  <td className="p-3 border border-gray-300">
                    <DeleteCartItem
                      onDelete={() => handleDelete(item.productId)}
                    />
                  </td>
                  <td className="p-3 border border-gray-300 justify-center">
                    <Buy productId={item.productId} />
                  </td>
                  <td className="p-3 border border-gray-300 justify-center">
                    <button className="bg-blue-300 px-4 py-2 rounded-xl">
                      Rate
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300 justify-center">
                    <button className="bg-blue-300  px-4 py-2 rounded-xl">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
