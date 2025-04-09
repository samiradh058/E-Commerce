import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getProductFromId } from "../../_utils/products";
import { getRecommendedProducts } from "../../_utils/products";

import BackButton from "../../_components/BackButton";
import QnA_Add from "../../_components/QnA_Add";
import QnAReview from "../../_components/QnAReview";

export default async function ProductPage({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const param = await params;
  const product = await getProductFromId(param.productId);

  const recommendedProducts = await getRecommendedProducts(product);

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <div className="mt-2">
        <BackButton />
      </div>

      <div className="min-h-screen p-6 flex">
        <div className="md:w-[70%]">
          <div className="w-[90%] mx-auto text-lg">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-md bg-cardBg">
              <div className="flex flex-col md:flex-row gap-8 items-center w-full">
                <div className="relative h-96 w-[40%]">
                  <Image
                    src={product.image}
                    alt="Image of product"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-6 flex-grow w-[60%]">
                  <div className="flex flex-col gap-6">
                    <div>
                      <h1 className="font-semibold text-xl md:text-2xl text-textPrimary">
                        {product.name}
                      </h1>
                      <div className="italic text-base md:text-lg text-textSecondary break-words">
                        {product.description}
                      </div>
                      <div className="flex gap-2 items-center font-semibold text-xl text-textPrimary">
                        {Array.from({ length: fullStars }).map((_, index) => (
                          <FaStar key={index} className="text-yellow-400" />
                        ))}
                        {hasHalfStar && (
                          <FaStarHalfAlt className="text-yellow-400" />
                        )}

                        {Array.from({ length: emptyStars }).map((_, index) => (
                          <FaRegStar key={index} className="text-gray-400" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Link href="#qna" className="text-info hover:underline">
                        <span className="font-semibold text-xl">
                          {
                            product.qna?.filter(
                              (q: { question: string; answer: string }) =>
                                q.answer?.trim() !== ""
                            ).length
                          }
                        </span>{" "}
                        Answered Questions /{" "}
                        <span className="font-semibold text-xl">
                          {product.review?.length}{" "}
                        </span>
                        Reviews
                      </Link>
                      <p className="text-base md:text-lg text-textSecondary">
                        Brand:{" "}
                        <span className="font-semibold">{product.brand}</span>
                      </p>
                      <p className="text-base md:text-lg text-textSecondary">
                        Price:{" "}
                        <span className="font-semibold">
                          Rs. {product.price}
                        </span>
                      </p>
                      <p className="text-base md:text-lg text-textSecondary">
                        Quantity:{" "}
                        <span className="font-semibold">
                          {product.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-6 w-full">
                    <QnA_Add productId={product.productId} />
                    <div className="flex flex-col">
                      <p className="text-lg text-textSecondary mb-2">
                        Delivery Options
                      </p>
                      <p className="text-lg">
                        Delivery Fee:{" "}
                        <span className="font-semibold text-xl">Rs. 50</span>
                      </p>
                      <p className="text-lg">
                        Cash on Delivery:{" "}
                        <span className="font-semibold text-xl">
                          Not Available
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="qna"
            className="h-fit mt-4 flex items-center w-full md:w-[80%] mx-auto"
          >
            <QnAReview qna={product.qna} review={product.review} />
          </div>
        </div>
        <div className="md:w-[30%] bg-cardBg p-4 rounded-lg shadow-md h-fit max-h-screen sticky top-1 overflow-auto">
          <h2 className="text-xl font-semibold text-textPrimary mb-4 flex justify-center">
            You might also like
          </h2>
          <div className="flex flex-col gap-4">
            {recommendedProducts.map(
              (item: {
                productId: string;
                image: string;
                name: string;
                price: number;
              }) => (
                <Link
                  href={`/product/${item.productId}`}
                  key={item.productId}
                  className="flex gap-8 hover:bg-muted p-2 rounded-md"
                >
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-sm text-textPrimary">
                      {item.name}
                    </p>
                    <p className="text-sm text-textSecondary">
                      Rs. {item.price}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
