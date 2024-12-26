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

export default function Main() {
  return (
    <div className="bg-gray-100 flex-grow p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Items:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <Link
            href={`/product/${item.productId}`}
            key={item.name}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-56">
              <Image src="/logo.png" alt="Item" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-700 mb-1">Rs. {item.price}</p>
              <p className="text-gray-500">
                {item.quantityAvailable} remaining
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
