import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface Product {
  productId: string;
  name: string;
  price: number;
  // image: string;
  description: string;
  category: string;
  quantity: number;
  qna: { question: string; answer: string }[];
  onDelete: (productId: string) => void;
  onEdit: (product: Product) => void;
  isAdmin: boolean;
}

export default function EachProduct({
  productId,
  name,
  price,
  // image,
  description,
  category,
  quantity,
  qna,
  onDelete,
  onEdit,
  isAdmin,
}: Product) {
  return (
    <div className="relative group">
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

      {isAdmin && (
        <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onDelete(productId)}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
          >
            <MdDelete />
          </button>

          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
            onClick={() =>
              onEdit({
                productId,
                name,
                price,
                // image,
                description,
                category,
                quantity,
                qna,
                onDelete,
                onEdit,
                isAdmin,
              })
            }
          >
            <FaEdit />
          </button>
        </div>
      )}
    </div>
  );
}
