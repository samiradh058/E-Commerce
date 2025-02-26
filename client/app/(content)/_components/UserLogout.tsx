"use client";

import { useState } from "react";
import { handleLogout } from "../_utils/user";
import { redirect } from "next/navigation";

export default function UserLogout({
  user,
}: {
  user: { name: string; email: string };
}) {
  const [showEmail, setShowEmail] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null | undefined>(
    null
  );

  const handleLogoutClick = async (): Promise<void> => {
    const result = await handleLogout();

    if (result.success) {
      redirect("/login");
    } else {
      setLogoutError(result.error);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <h2
          onMouseEnter={() => setShowEmail(true)}
          onMouseLeave={() => setShowEmail(false)}
          className="text-md font-normal text-gray-700 p-2 rounded-lg transition-all duration-300"
        >
          Welcome,{" "}
          <span className="font-bold text-lg text-blue-600">
            {user.name.split(" ")[0]}
          </span>
        </h2>
        {showEmail && (
          <h2 className="absolute text-sm text-gray-500 left-10 top-8">
            {user.email}
          </h2>
        )}
      </div>

      <button
        onClick={handleLogoutClick}
        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-200"
      >
        Logout
      </button>
      {logoutError && <p className="text-red-500 text-sm">{logoutError}</p>}
    </div>
  );
}
