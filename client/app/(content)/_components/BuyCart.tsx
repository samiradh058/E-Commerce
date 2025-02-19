import Link from "next/link";

export default function BuyCart() {
  return (
    <div className="flex gap-2 mt-4">
      <Link href="#" className="w-full bg-red-400 text-center">
        Buy
      </Link>
      <Link href="/cart" className="w-full bg-pink-400 text-center">
        Add to cart
      </Link>
    </div>
  );
}
