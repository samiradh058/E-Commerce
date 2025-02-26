import React from "react";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../../app/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | QuickCart",
    default: "Welcome | QuickCart",
  },
  description: "Online e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} antialiased h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow overflow-y-scroll w-[98%] mx-auto bg-gray-100 ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
