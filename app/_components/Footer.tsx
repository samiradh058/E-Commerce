import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-red-200 h-fit flex justify-between w-[98%] mx-auto">
      <p className="">Total items in cart: X</p>
      <p className="">Total price: XX</p>
      <Link href="/cart">Goto Cart</Link>
    </div>
  );
}
