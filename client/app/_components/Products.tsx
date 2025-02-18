"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);
  console.log(items);

  if (isLoading) {
    throw new Promise(() => {});
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.length > 0 &&
        items.map((item) => (
          <Link
            href={`/product/${item._id}`}
            key={item._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-56">
              <Image src="/icon.png" alt="Item" fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="px-1 border-gray-300 border-2 h-fit rounded-md">
                  {item.category}
                </p>
              </div>
              <p className="mb-1 text-stone-600">{item.description}</p>
              <p className="text-stone-900 font-semibold">Rs. {item.price}</p>
              <p className="text-stone-600">{item.quantity} remaining</p>
            </div>
          </Link>
        ))}
    </ul>
  );
}
