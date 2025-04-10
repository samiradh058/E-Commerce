"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddToCart({ productId }: { productId: string }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [inCart, setInCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8080/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        setAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    const checkCart = async () => {
      try {
        const res = await fetch("http://localhost:8080/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const cartData = (await res.json()) || [];

        if (!Array.isArray(cartData)) {
          return;
        }

        const productExists = cartData.some(
          (item: { productId: string }) => item.productId === productId
        );
        setInCart(productExists);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    checkSession();
    checkCart();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!authenticated) {
      router.replace("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product to cart");
      }
      alert("Product added to cart!");
      router.push("/cart-order");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full ${
        inCart ? "bg-gray-300" : "bg-pink-400"
      }  py-1 px-2 rounded-md text-nowrap`}
      disabled={inCart}
    >
      {inCart ? "Added" : "Add to Cart"}
    </button>
  );
}
