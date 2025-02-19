import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-red-200 h-fit flex justify-between w-[98%] mx-auto p-2 items-center text-[20px]">
      <p className="">
        Total items in cart:{" "}
        <span className="font-semibold text-[22px]">X</span>
      </p>
      <p className="">
        Total price: <span className="font-semibold text-[22px]">XX</span>
      </p>
      <Link
        href="/cart"
        className="bg-green-200 px-4 py-2 rounded-lg border border-green-500"
      >
        Goto Cart
      </Link>
    </div>
  );
}
