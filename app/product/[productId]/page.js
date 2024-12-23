import BuyCart from "@/app/_components/BuyCart";
import Quantity from "@/app/_components/Quantity";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage() {
  //Fetch data
  //   const param = await params;
  //   const id = await param.productId;

  const productDetails = {
    name: "Product 1",
    description: "Very comfortable and stylish product",
    rating: 4.5,
    qna: [
      { Question1: "What", Answer1: "This is a product" },
      { Question2: "How", Answer2: "This is a product" },
      { Question3: "Why", Answer3: "This is a product" },
    ],
    brand: "Brand 1",
    price: 100,
    quantity: 10,
  };

  return (
    <div className="w-[80%] mx-auto mt-12 text-[18px]">
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
              <div className="flex gap-4 items-center">
                <Link href="#rating">
                  <span className="font-semibold text-[20px]">
                    {productDetails.rating}
                  </span>
                </Link>
                <Link href="#qna">
                  <span className="font-semibold text-[20px]">X</span> Answered
                  Questions
                </Link>
              </div>

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
            <p className="text-[18px] text-stone-500 mb-2">Delivery Options</p>
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
              <span className="font-semibold text-[20px]"> Not Available</span>
            </p>
          </div>
        </div>
      </div>
      <div>Hello</div>
    </div>
  );
}
