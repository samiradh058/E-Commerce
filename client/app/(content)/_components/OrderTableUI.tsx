import { useState } from "react";
import { changeReceivedStatus, updateProduct } from "../_utils/products";
import { redirect, useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { useAuth } from "@/app/_customHooks/useAuth";

interface OrderItem {
  createdAt: Date;
  paymentMethod: string;
  productId: string;
  productName: string;
  quantity: number;
  receivedStatus: boolean;
  totalAmount: number;
  updatedAt: Date;
  transactionId: string;
}

export default function OrderTableUI({
  orderItems,
}: {
  orderItems: OrderItem[];
}) {
  const router = useRouter();
  const [modalData, setModalData] = useState<{
    productId: string;
    type: "rating" | "review";
  } | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const { user } = useAuth();

  async function handleReceivedStatusChange(index: number) {
    await changeReceivedStatus({
      transactionId: orderItems[index].transactionId,
      receivedStatus: orderItems[index].receivedStatus,
    });

    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].receivedStatus =
      !updatedOrderItems[index].receivedStatus;

    router.refresh();
  }

  function openModal(productId: string, type: "rating" | "review") {
    setModalData({ productId, type });
  }

  function closeModal() {
    setModalData(null);
    setRating(0);
    setReview("");
  }

  async function submitFeedback() {
    if (!modalData) return;

    if (modalData.type === "rating") {
      await updateProduct(modalData.productId, {
        rating,
      });

      redirect(`/product/${modalData.productId}`);
    } else {
      const data = await updateProduct(modalData.productId, {
        review: [
          {
            author: user?.email || "Anonymous",
            comments: review,
          },
        ],
      });
      if (data.success) {
        alert("Review submitted");
      } else {
        alert("You have already reviewd the product");
      }
      redirect(`/product/${modalData.productId}`);
    }

    closeModal();
  }

  return (
    <div className="min-h-screen p-6">
      <div className="w-full md:w-[90%] lg:w-[80%] mx-auto p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Your Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800 text-center">
                <th className="p-3 border border-gray-300">Product</th>
                <th className="p-3 border border-gray-300">Quantity</th>
                <th className="p-3 border border-gray-300">Total Amount</th>
                <th className="p-3 border border-gray-300">Payment Method</th>
                <th className="p-3 border border-gray-300">Order Date</th>
                <th className="p-3 border border-gray-300">Received</th>
                <th className="p-3 border border-gray-300">Rate</th>
                <th className="p-3 border border-gray-300">Review</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-3 border border-gray-300">
                    {order.productName}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {order.quantity}
                  </td>
                  <td className="p-3 border border-gray-300">
                    ${order.totalAmount}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {order.paymentMethod}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {!order.receivedStatus ? (
                      <select
                        value={order.receivedStatus ? "true" : "false"}
                        onChange={() => handleReceivedStatusChange(index)}
                        className="p-2 border rounded-md bg-transparent border-none"
                      >
                        <option value="true">✅ Yes</option>
                        <option value="false">❌ No</option>
                      </select>
                    ) : (
                      <div>✅ Yes</div>
                    )}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      disabled={!order.receivedStatus}
                      onClick={() => openModal(order.productId, "rating")}
                      className={`${
                        order.receivedStatus ? "bg-blue-300" : "bg-stone-300"
                      } px-4 py-2 rounded-xl`}
                    >
                      Rate
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      disabled={!order.receivedStatus}
                      onClick={() => openModal(order.productId, "review")}
                      className={`${
                        order.receivedStatus ? "bg-blue-300" : "bg-stone-300"
                      } px-4 py-2 rounded-xl`}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {modalData.type === "rating" ? "Rate Product" : "Write a Review"}
            </h2>
            {modalData.type === "rating" ? (
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-3xl cursor-pointer transition-colors ${
                      star <= (hover || rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            ) : (
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border p-2 rounded-md"
                placeholder="Write your review here"
              />
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
