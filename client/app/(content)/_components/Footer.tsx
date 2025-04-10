"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCartItems } from "../_utils/products";
import { useEffect, useState } from "react";
import { fetchUsers } from "../_utils/user";
import { useAuth } from "@/app/_customHooks/useAuth";

export const revalidate = 0;

export default function Footer() {
  const [cartItems, setCartItems] = useState<
    { price: number; quantity: number }[]
  >([]);
  const [users, setUsers] = useState<
    | {
        name: string;
        email: string;
      }[]
    | undefined
  >(undefined);

  const pathname = usePathname();

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function loadCart() {
      const result = await fetchCartItems();

      if (result.error) {
        setAdmin(true);
      }
      setCartItems(result.data || []);
    }

    async function loadUsers() {
      const result = await fetchUsers();
      if (result?.data) {
        setUsers(result.data);
      } else {
        setUsers(undefined);
      }
    }

    loadUsers();
    loadCart();
  }, [pathname]);

  const { user } = useAuth();

  const totalPrice = cartItems.length
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity + 50, 0)
    : 0;

  if (!user) {
    return;
  }

  if (admin)
    return (
      pathname !== "/users-notdelivered" && (
        <div
          className={`bg-background shadow-md rounded-lg h-fit flex w-[98%] mx-auto p-4 items-center text-textPrimary text-lg justify-between`}
        >
          <p>
            Total number of users:{" "}
            <span className="font-semibold text-xl text-secondary">
              {users?.length || 0}
            </span>
          </p>

          <Link
            href="/users-notdelivered"
            className="bg-success text-white px-5 py-2 rounded-lg border border-green-600 shadow-md hover:opacity-90 transition-all duration-200"
          >
            Users / Not Delivered Items
          </Link>
        </div>
      )
    );

  return (
    pathname !== "/cart" && (
      <div
        className={`bg-background shadow-md rounded-lg h-fit flex ${
          pathname === "/cart" ? "justify-around" : "justify-between"
        } w-[98%] mx-auto p-4 items-center text-textPrimary text-lg`}
      >
        <p>
          Total items in cart:{" "}
          <span className="font-semibold text-xl text-secondary">
            {cartItems.length || 0}
          </span>
        </p>
        <p>
          Total price:{" "}
          <span className="font-semibold text-xl text-secondary">
            Rs. {totalPrice.toFixed(2)}
          </span>
        </p>

        <Link
          href="/cart-order"
          className="bg-success text-white px-5 py-2 rounded-lg border border-green-600 shadow-md hover:opacity-90 transition-all duration-200"
        >
          Cart / Order
        </Link>
      </div>
    )
  );
}
