"use client";

import Image from "next/image";
import Search from "./Search";
import Login_Singup from "./Login_Signup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "../_utils/user";
import UserLogout from "./UserLogout";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    async function checkLogin() {
      const data = await checkLoggedIn();
      if (data && data.isAuthenticated) {
        setLoggedIn(true);
        setUser({ name: data.user.name, email: data.user.email });
      }
    }
    checkLogin();
  }, []);

  return (
    <div className="bg-stone-200 h-fit flex w-[98%] mx-auto justify-between">
      <Link href="/" className="p-1 flex flex-col items-center">
        <div className="relative h-16 aspect-square">
          <Image src="/logo.png" alt="Logo" fill className="rounded-full" />
        </div>
        <h1 className="font-bold text-[16px] tracking-wide">QuickCart</h1>
      </Link>
      <Search />
      {loggedIn && user ? <UserLogout user={user} /> : <Login_Singup />}
    </div>
  );
}
