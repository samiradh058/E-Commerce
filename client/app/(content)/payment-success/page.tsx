"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyPayment } from "../_utils/products";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const pidx = searchParams.get("pidx");

    if (!pidx) {
      alert("Payment verification failed: Payment ID not found.");
      window.location.href = "/cart-order";
    }

    verifyPayment(searchParams);
  }, [searchParams]);

  return;
};

export default PaymentSuccess;
