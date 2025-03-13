"use client";

import Quantity from "../_components/Quantity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../_components/BackButton";
import { deleteCartItem, fetchCartItems } from "../_utils/products";
import Buy from "../_components/Buy";
import DeleteCartItem from "../_components/DeleteCartItem";
import Spinner from "../_components/Spinner";

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
      } else if (result === "Admin donot have a cart") {
        router.replace("/");
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
      router.refresh();
    }
  }

  if (loading) {
    return <Spinner />;
  }
  if (!cartItems.length)
    return (
      <>
        <div>
          <BackButton />
        </div>
        <p className="flex justify-center text-[32px] font-bold">
          Your cart is empty.
        </p>
      </>
    );

  return (
    <div className="bg-background min-h-screen p-6">
      {/* Back Button */}
      <div>
        <BackButton />
      </div>

      {/* Cart Container */}
      <div className="w-full md:w-[80%] mx-auto">
        <h2 className="font-semibold text-2xl text-textPrimary text-center mb-6">
          Items in your cart:
        </h2>

        {/* Table Header */}
        <div className="grid grid-cols-10 gap-4 bg-gray-200 p-4 rounded-lg font-semibold text-textPrimary">
          <div className="col-span-2 flex justify-center">Name</div>
          <div className="col-span-1 flex justify-center">Unit Price</div>
          <div className="col-span-1 flex justify-center">Total Price</div>
          <div className="col-span-2 flex justify-center">
            Price with Delivery
          </div>
          <div className="col-span-2 flex justify-center">Quantity</div>
          <div className="col-span-1 flex justify-center">Delete</div>
          <div className="col-span-1 flex justify-center">Buy</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mt-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-cardBg shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <ul className="grid grid-cols-10 gap-4 items-center text-textPrimary">
                <li className="col-span-2 text-lg font-medium flex justify-center">
                  {item.name}
                </li>
                <li className="col-span-1 text-lg font-medium flex justify-center">
                  Rs. {item.price}
                </li>
                <li className="col-span-1 text-lg font-medium flex justify-center text-nowrap">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </li>
                <li className="col-span-2 text-lg font-medium flex justify-center">
                  Rs. {(item.price * item.quantity + 50).toFixed(2)}
                </li>
                <li className="col-span-2 flex justify-center">
                  <Quantity
                    productId={item.productId}
                    initialQuantity={item.quantity}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(item.productId, newQuantity)
                    }
                  />
                </li>
                <li className="col-span-1 flex justify-center">
                  <DeleteCartItem
                    onDelete={() => handleDelete(item.productId)}
                  />
                </li>
                <li className="col-span-1 flex justify-center">
                  <Buy productId={item.productId} />
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
