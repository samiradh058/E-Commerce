import BuyCart from "@/app/_components/BuyCart";
import QnA from "@/app/_components/QnA";
import Quantity from "@/app/_components/Quantity";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default async function ProductPage() {
  //Fetch data
  //   const param = await params;
  //   const id = await param.productId;

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
    <>
      <div className="mt-8 text-[18px] bg-green-200 px-2 py-1 rounded-lg border border-green-500 w-fit">
        <Link href="/">Go Back</Link>
      </div>
      <div className="w-[80%] mx-auto mt-8 text-[18px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-8 items-center bg-stone-200">
            <div className="relative h-96 aspect-square">
              <Image src="/logo.png" alt="Image of product" fill />
            </div>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-[20px]">
                  {productDetails.name}
                </h1>
                <div className="italic">{productDetails.description}</div>
                <div className="flex gap-4 items-center font-semibold text-[20px]">
                  <span>{productDetails.rating}</span>{" "}
                  {Array.from({ length: fullStars }).map((_, index) => (
                    <FaStar key={index} className="text-yellow-400" />
                  ))}
                  {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
                </div>
                <Link href="#qna">
                  <span className="font-semibold text-[20px]">X</span> Answered
                  Questions
                </Link>

                <p>
                  Brand:{" "}
                  <span className="font-semibold text-[20px]">
                    {productDetails.brand}
                  </span>
                </p>
                <p>
                  Price:{" "}
                  <span className="font-semibold text-[20px]">
                    Rs. {productDetails.price}
                  </span>
                </p>
                <p>
                  Quantity:{" "}
                  <span className="font-semibold text-[20px]">
                    {productDetails.quantity}
                  </span>
                </p>
              </div>
              <div>
                <Quantity />
                <BuyCart />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
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
            <div>
              <p className="text-[18px] text-stone-500 mb-2">
                Return and Warranty
              </p>
              <p>
                <span className="font-semibold text-[20px]">14</span> Day Free
                Returns
              </p>
              <p>
                Warranty:{" "}
                <span className="font-semibold text-[20px]">
                  {" "}
                  Not Available
                </span>
              </p>
            </div>
          </div>
        </div>
        <QnA qna={productDetails.qna} />
      </div>
    </>
  );
}
