"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyPayment } from "../_utils/products";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    verifyPayment(searchParams);
  }, [searchParams]);

  return;
};

export default PaymentSuccess;
