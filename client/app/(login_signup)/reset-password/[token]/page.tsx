"use client";

import { useState } from "react";
import { redirect, useParams } from "next/navigation";
import { resetPassword } from "@/app/(content)/_utils/user";
import { IoMdLock } from "react-icons/io";

export default function ResetPassword() {
  const param = useParams();
  const token = param.token;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const formErrors: { [key: string]: string } = {};

    if (!newPassword) {
      formErrors.newPassword = "Password is required";
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = "Password confirmation is required";
    }

    if (newPassword.length < 8) {
      formErrors.passwordLength = "Password must be at least 8 characters";
    }

    if (newPassword !== confirmPassword) {
      formErrors.passwordMatch = "Passwords do not match";
    }

    setError(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof token !== "string") {
      setError({ ...error, token: "Invalid token" });
      return;
    }

    if (validateForm()) {
      const result = await resetPassword(token, newPassword, confirmPassword);

      if (!result.success) {
        setError({
          ...error,
          server: result.message || "Server error occurred",
        });
        return;
      }
      alert(result.message);
      redirect("/login");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[18rem] sm:w-[20rem] lg:w-[22rem] p-6 pb-4 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset your Password
        </h2>
        {error.token && <p className="text-red-500 text-sm">{error.token}</p>}

        <form onSubmit={handleResetPassword}>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-700">
                <IoMdLock />
              </span>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {error.newPassword && (
              <p className="text-red-500 text-sm">{error.newPassword}</p>
            )}
            {error.passwordLength && (
              <p className="text-red-500 text-sm">{error.passwordLength}</p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-700">
                <IoMdLock />
              </span>
              <input
                type="password"
                id="confirmPassword"
                className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error.confirmPassword && (
              <p className="text-red-500 text-sm">{error.confirmPassword}</p>
            )}
            {error.passwordMatch && (
              <p className="text-red-500 text-sm">{error.passwordMatch}</p>
            )}
            {error.server && (
              <p className="text-red-500 text-sm">{error.server}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-primary text-white p-2 rounded-lg hover:opacity-95 hover:scale-105 transition-transform duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
