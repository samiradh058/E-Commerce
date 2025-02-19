import { ReactNode } from "react";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="absolute left-2 top-2 h-16 z-10">
          <Link href="/" className="flex flex-col items-center">
            <div className="relative h-16 aspect-square">
              <Image src="/logo.png" alt="Logo" fill className="rounded-full" />
            </div>
            <h1 className="font-bold text-[16px] tracking-wide text-white">
              QuickCart
            </h1>
          </Link>
        </div>
        <Link
          href="/signup"
          className="absolute top-2 right-2 z-10 bg-green-600 py-1 px-2 font-semibold text-white rounded-full"
        >
          Signup
        </Link>
        <div className="relative w-screen h-screen bg-black">
          <Image
            src="/bg.jpg"
            alt="Background Image"
            fill
            className="object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-fit h-fit mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
