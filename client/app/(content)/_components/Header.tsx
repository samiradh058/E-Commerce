import Image from "next/image";
import Search from "./Search";
import Login_Singup from "./Login_Signup";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-stone-200 h-fit flex w-[98%] mx-auto justify-between">
      <Link href="/" className="p-1 flex flex-col items-center">
        <div className="relative h-16 aspect-square">
          <Image src="/logo.png" alt="Logo" fill className="rounded-full" />
        </div>
        <h1 className="font-bold text-[16px] tracking-wide">QuickCart</h1>
      </Link>
      <Search />
      <Login_Singup />
    </div>
  );
}
