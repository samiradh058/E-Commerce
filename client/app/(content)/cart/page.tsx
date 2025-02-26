"use client";

import Quantity from "../_components/Quantity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../_components/BackButton";
import { ImCross } from "react-icons/im";
import { deleteCartItem, fetchCartItems } from "../_utils/products";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<
    { productId: string; name: string; price: number; quantity: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      const result = await fetchCartItems();
      if (result.error === "unauthorized") {
        router.replace("/login");
      } else {
        setCartItems(result.data || []);
        setLoading(false);
      }
    }
    loadCart();
  }, [router]);

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
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center text-[32px] font-bold">
        Loading...
      </div>
    );
  }
  if (!cartItems.length)
    return (
      <p className="flex justify-center text-[32px] font-bold">
        Your cart is empty.
      </p>
    );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="mt-0 text-[18px] bg-green-200 px-4 py-2 rounded-lg border border-green-500 w-fit">
        <BackButton />
      </div>
      <div className="w-full md:w-[80%] mx-auto mt-4">
        <h2 className="font-semibold text-[24px] mb-4 text-center">
          Items in your cart:
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 items-center bg-gray-200 p-4 rounded-lg">
            <div className="col-span-2 font-semibold flex justify-center">
              Name
            </div>
            <div className="col-span-2 font-semibold flex justify-center">
              Unit Price
            </div>
            <div className="col-span-2 font-semibold flex justify-center">
              Total Price
            </div>
            <div className="col-span-2 font-semibold flex justify-center">
              Price with Delivery
            </div>
            <div className="col-span-3 font-semibold flex justify-center">
              Quantity
            </div>
            <div className="col-span-1 font-semibold flex justify-center">
              Delete
            </div>
          </div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <ul className="grid grid-cols-12 gap-4 items-center">
                <li className="col-span-2 text-lg font-medium flex justify-center">
                  {item.name}
                </li>
                <li className="col-span-2 text-lg font-medium flex justify-center">
                  Rs. {item.price}
                </li>
                <li className="col-span-2 text-lg font-medium flex justify-center">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </li>
                <li className="col-span-2 text-lg font-medium flex justify-center">
                  Rs. {(item.price * item.quantity + 50).toFixed(2)}
                </li>
                <li className="col-span-3 flex justify-center">
                  <Quantity
                    productId={item.productId}
                    initialQuantity={item.quantity}
                    onQuantityChange={(newQuantity) => {
                      handleQuantityChange(item.productId, newQuantity);
                    }}
                  />
                </li>
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="col-span-1 text-lg font-medium flex justify-center text-red-500"
                >
                  <ImCross />
                </button>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
