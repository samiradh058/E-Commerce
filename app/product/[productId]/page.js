import BuyCart from "@/app/_components/BuyCart";
import QnA from "@/app/_components/QnA";
import Quantity from "@/app/_components/Quantity";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default async function ProductPage() {
  //Fetch data
  // const param = await params;
  // const id = await param.productId;

  const productDetails = {
    name: "Product 1",
    description: "Very comfortable and stylish product",
    rating: 4.5,
    qna: [
      {
        Question: "What?",
        Answer: "This is a product",
      },
      { Question: "How?", Answer: "This is a product" },
      { Question: "Why?", Answer: "This is a product" },
    ],
    brand: "Brand 1",
    price: 100,
    quantity: 10,
  };

  const fullStars = Math.floor(productDetails.rating);
  const hasHalfStar = productDetails.rating % 1 !== 0;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="text-[18px] bg-green-200 px-4 py-2 rounded-lg border border-green-500 w-fit">
        <Link href="/">Go Back</Link>
      </div>
      <div className="w-full md:w-[80%] mx-auto mt-2 text-[18px]">
        <div className="flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-8 items-center w-full">
            <div className="relative h-56 w-56 md:h-96 md:w-96">
              <Image
                src="/logo.png"
                alt="Image of product"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-6 flex-grow">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-[24px] md:text-[28px]">
                  {productDetails.name}
                </h1>
                <div className="italic text-[16px] md:text-[18px]">
                  {productDetails.description}
                </div>
                <div className="flex gap-2 items-center font-semibold text-[20px]">
                  <span>{productDetails.rating}</span>
                  {Array.from({ length: fullStars }).map((_, index) => (
                    <FaStar key={index} className="text-yellow-400" />
                  ))}
                  {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
                </div>
                <Link href="#qna" className="text-blue-500 hover:underline">
                  <span className="font-semibold text-[20px]">X</span> Answered
                  Questions
                </Link>
                <p className="text-[16px] md:text-[18px]">
                  Brand:{" "}
                  <span className="font-semibold">{productDetails.brand}</span>
                </p>
                <p className="text-[16px] md:text-[18px]">
                  Price:{" "}
                  <span className="font-semibold">
                    Rs. {productDetails.price}
                  </span>
                </p>
                <p className="text-[16px] md:text-[18px]">
                  Quantity:{" "}
                  <span className="font-semibold">
                    {productDetails.quantity}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex flex-col gap-4">
                  <Quantity />
                  <BuyCart />
                </div>
                <div className="flex flex-col">
                  <p className="text-[18px] text-stone-500 mb-2">
                    Delivery Options
                  </p>
                  <p>
                    Delivery Fee:{" "}
                    <span className="font-semibold text-[20px]">Rs. X</span>
                  </p>
                  <p>
                    Cash on Delivery:{" "}
                    <span className="font-semibold text-[20px]">Available</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="qna"
        className="h-fit mt-2 flex items-center w-full md:w-[80%] mx-auto"
      >
        <QnA qna={productDetails.qna} />
      </div>
    </div>
  );
}
