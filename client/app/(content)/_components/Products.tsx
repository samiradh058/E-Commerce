import Image from "next/image";
import Link from "next/link";

interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

function EachProduct({
  productId,
  name,
  price,
  // image,
  description,
  category,
  quantity,
}: Product) {
  return (
    <Link
      href={`/product/${productId}`}
      key={productId}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
    >
      <div className="relative h-56 w-full">
        <Image src="/icon.png" alt="Item" fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="px-1 border-gray-300 border-2 h-fit rounded-md">
            {category}
          </p>
        </div>
        <p className="mb-1 text-stone-600">{description}</p>
        <p className="text-stone-900 font-semibold">Rs. {price}</p>
        <p className="text-stone-600">{quantity} remaining</p>
      </div>
    </Link>
  );
}

export default function Products({ items }: { items: Product[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.length > 0 &&
        items.map((item) => <EachProduct key={item.productId} {...item} />)}
    </ul>
  );
}
