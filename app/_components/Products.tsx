import Image from "next/image";
import Link from "next/link";

const items = [
  { productId: 1, name: "Item 1", price: 10, quantityAvailable: 10 },
  { productId: 2, name: "Item 2", price: 20, quantityAvailable: 50 },
  { productId: 3, name: "Item 3", price: 30, quantityAvailable: 1 },
  { productId: 4, name: "Item 4", price: 40, quantityAvailable: 10 },
  { productId: 5, name: "Item 5", price: 50, quantityAvailable: 100 },
  { productId: 6, name: "Item 6", price: 60, quantityAvailable: 10 },
  { productId: 7, name: "Item 7", price: 70, quantityAvailable: 10 },
  { productId: 8, name: "Item 8", price: 80, quantityAvailable: 10 },
  { productId: 9, name: "Item 9", price: 90, quantityAvailable: 10 },
  { productId: 10, name: "Item 10", price: 100, quantityAvailable: 10 },
];

export default function Products() {
  return (
    <div className="bg-green-300 flex-grow w-[98%] mx-auto">
      <h2 className="p-4 text-[20px]">Available Items:</h2>
      <ul className="grid grid-cols-12 list-style-none gap-4 mx-2">
        {items.map((item) => (
          <Link
            href={`/product/${item.productId}`}
            key={item.name}
            className="col-span-3 bg-pink-300 flex flex-col gap-2 pb-2 rounded-md hover:scale-105 transition-transform duration-200"
          >
            <div className="relative h-56">
              <Image src="/logo.png" alt="Item" fill />
            </div>

            <div className="flex flex-col justify-center pl-2">
              <h3 className="text-[20px] font-semibold">{item.name}</h3>
              <p className="text-[18px]">Rs.{item.price}</p>
              <p className="text-[18px]">{item.quantityAvailable} remaining</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
