"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Back() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="w-fit text-lg bg-success text-white px-2 py-1 rounded-lg border border-green-600 shadow-md hover:opacity-90 transition-all duration-200"
    >
      <IoMdArrowRoundBack />
    </button>
  );
}
