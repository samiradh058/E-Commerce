import Image from "next/image";
import Link from "next/link";

export default async function ProductPage() {
  //Fetch data
  //   const param = await params;
  //   const id = await param.productId;

  const productDetails = {
    name: "Product 1",
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
    <div className="w-[92%] mx-auto mt-12">
      <div className="flex gap-8 items-center">
        <div className="relative h-96 aspect-square">
          <Image src="/logo.png" alt="Image of product" fill />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-[20px]">{productDetails.name}</h1>
          <div className="flex gap-4">
            <p>{productDetails.rating}</p>
            <Link href="#qna">X Answered Questions</Link>
          </div>

          <p className="text-[18px]">
            Brand: <span className="font-semibold">{productDetails.brand}</span>
          </p>
          <p>Price: {productDetails.price}</p>
          <p>Quantity: {productDetails.quantity}</p>
        </div>
      </div>
      ;
    </div>
  );
}
