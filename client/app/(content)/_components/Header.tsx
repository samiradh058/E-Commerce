"use client";

import Image from "next/image";
import Login_Singup from "./Login_Signup";
import Link from "next/link";
import UserLogout from "./UserLogout";
import Add_Admin from "./Add_admin";
import { useAuth } from "@/app/_customHooks/useAuth";

export default function Header() {
  const { user, loggedIn } = useAuth();

  return (
    <div className="bg-background shadow-md h-fit flex w-[98%] mx-auto justify-between items-center p-3 rounded-lg">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative h-12 w-12">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="rounded-full border border-border"
          />
        </div>
        <h1 className="font-bold text-xl text-primary tracking-wide">
          QuickCart
        </h1>
      </Link>

      {loggedIn && user ? (
        <div className="flex items-center gap-2">
          <UserLogout user={user} />
          {user?.role === "admin" ? <Add_Admin /> : ""}
        </div>
      ) : (
        <Login_Singup />
      )}
    </div>
  );
}
