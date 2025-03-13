"use client";

import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import AskQuestion from "./AskQuestion";
import Buy from "./Buy";
import { checkLoggedIn } from "../_utils/user";

export default function QnA_Buy_Add({ productId }: { productId: string }) {
  const [role, setRole] = useState("user");

  useEffect(() => {
    async function userRole() {
      const user = await checkLoggedIn();
      setRole(user.user?.role);
    }
    userRole();
  }, []);

  if (role === "admin") {
    return;
  }

  return (
    <div className="flex flex-col">
      <AskQuestion productId={productId} />
      <div className="flex gap-4 mt-4">
        <AddToCart productId={productId} />
        <Buy productId={productId} />
      </div>
    </div>
  );
}
