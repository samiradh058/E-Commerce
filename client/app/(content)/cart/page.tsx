"use client";

// import type { Metadata } from "next";
import Quantity from "../_components/Quantity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../_components/BackButton";
import { ImCross } from "react-icons/im";

// export const metadata: Metadata = {
//   title: "Cart",
// };

// const cartItems = [
//   { productId: 1, name: "Item 1", price: 10, quantity: 10 },
//   { productId: 2, name: "Item 2", price: 20, quantity: 50 },
//   { productId: 3, name: "Item 3", price: 30, quantity: 1 },
//   { productId: 4, name: "Item 4", price: 40, quantity: 10 },
//   { productId: 5, name: "Item 5", price: 50, quantity: 100 },
//   { productId: 6, name: "Item 6", price: 60, quantity: 10 },
//   { productId: 7, name: "Item 7", price: 70, quantity: 10 },
//   { productId: 8, name: "Item 8", price: 80, quantity: 10 },
//   { productId: 9, name: "Item 9", price: 90, quantity: 10 },
//   { productId: 10, name: "Item 10", price: 100, quantity: 10 },
// ];

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<
    { productId: string; name: string; price: number; quantity: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("http://localhost:8080/cart", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (response.status === 401) {
          router.replace("/login");
        } else {
          setCartItems(data);
        }
      } catch (error) {
        console.error("Error fetching cart items", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [router]);

  function handleQuantityChange(productId: string, newQuantity: number) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function handleDelete(productId: string) {
    async function deleteItem() {
      try {
        const res = await fetch("http://localhost:8080/cart/delete", {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });
        if (res.ok) {
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.productId !== productId)
          );
        } else {
          throw new Error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item", error);
      }
    }
    deleteItem();
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
