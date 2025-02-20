"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname === "/login" ? "/signup" : "/login"}`}
      className="absolute top-4 right-4 z-10 bg-primary py-1 px-4 font-medium text-white rounded-full text-[20px] hover:scale-105 transition-transform duration-200"
    >
      {`${pathname === "/login" ? "Signup" : "Login"}`}
    </Link>
  );
}
