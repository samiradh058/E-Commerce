import type { Metadata } from "next";
import Quantity from "../_components/Quantity";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart",
};

const cartItems = [
  { productId: 1, name: "Item 1", price: 10, quantity: 10 },
  { productId: 2, name: "Item 2", price: 20, quantity: 50 },
  { productId: 3, name: "Item 3", price: 30, quantity: 1 },
  { productId: 4, name: "Item 4", price: 40, quantity: 10 },
  { productId: 5, name: "Item 5", price: 50, quantity: 100 },
  { productId: 6, name: "Item 6", price: 60, quantity: 10 },
  { productId: 7, name: "Item 7", price: 70, quantity: 10 },
  { productId: 8, name: "Item 8", price: 80, quantity: 10 },
  { productId: 9, name: "Item 9", price: 90, quantity: 10 },
  { productId: 10, name: "Item 10", price: 100, quantity: 10 },
];

export default function Cart() {
  return (
    <>
      <div className="mt-8 text-[18px] bg-green-200 px-2 py-1 rounded-lg border border-green-500 w-fit">
        <Link href="/">Go Back</Link>
      </div>
      <div className="w-[80%] mx-auto mt-8">
        <h2 className="font-semibold text-[24px] mb-4">
          Items in your cart are:
        </h2>
        {cartItems.map((item, index) => (
          <div key={index}>
            <ul className="my-2 py-2 px-2 grid grid-cols-12 w-[60%] text-[20px] bg-stone-100 hover:bg-stone-200">
              <li className="col-span-4 ">{item.name}</li>
              <li className="col-span-4">{item.price}</li>
              <li className="col-span-4">
                <Quantity />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
