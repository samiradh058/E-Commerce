import Image from "next/image";

const items = [
  { name: "Item 1", price: 10, quantityAvailable: 10 },
  { name: "Item 2", price: 20, quantityAvailable: 50 },
  { name: "Item 3", price: 30, quantityAvailable: 1 },
  { name: "Item 4", price: 40, quantityAvailable: 10 },
  { name: "Item 5", price: 50, quantityAvailable: 100 },
  { name: "Item 6", price: 60, quantityAvailable: 10 },
  { name: "Item 7", price: 70, quantityAvailable: 10 },
  { name: "Item 8", price: 80, quantityAvailable: 10 },
  { name: "Item 9", price: 90, quantityAvailable: 10 },
  { name: "Item 10", price: 100, quantityAvailable: 10 },
];

export default function Main() {
  return (
    <div className="bg-green-300 flex-grow w-[98%] mx-auto">
      <h2 className="p-4 text-[20px]">Available Items:</h2>
      <ul className="grid grid-cols-12 list-style-none gap-4 mx-2">
        {items.map((item) => (
          <li
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
          </li>
        ))}
      </ul>
    </div>
  );
}
