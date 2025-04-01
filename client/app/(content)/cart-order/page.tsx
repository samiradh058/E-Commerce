"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCartItems, fetchOrderItems } from "../_utils/products";
import Spinner from "../_components/Spinner";
import CartTableUI from "../_components/CartTableUI";
import OrderTableUI from "../_components/OrderTableUI";
import BackButton from "../_components/BackButton";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderItem {
  createdAt: Date;
  paymentMethod: string;
  productId: string;
  productName: string;
  quantity: number;
  receivedStatus: boolean;
  totalAmount: number;
  updatedAt: Date;
  transactionId: string;
}

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cartResult, orderResult] = await Promise.all([
          fetchCartItems(),
          fetchOrderItems(),
        ]);

        if (
          cartResult.error === "unauthorized" ||
          orderResult.error === "unauthorized"
        ) {
          return;
        } else if (cartResult.error || orderResult.error) {
          alert("Failed to fetch cart or order items");
          router.replace("/");
          return;
        } else {
          setCartItems(cartResult.data || []);
          setOrderItems(orderResult.data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading cart and order items", error);
        alert("Failed to load cart and order items");
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="mt-2">
      <div>
        <BackButton />
      </div>
      <CartTableUI cartItems={cartItems} setCartItems={setCartItems} />
      <OrderTableUI orderItems={orderItems} />
    </div>
  );
}
