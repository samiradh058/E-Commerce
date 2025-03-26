import { changeReceivedStatus } from "../_utils/products";
import { useRouter } from "next/navigation";

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

  if (!orderItems.length)
    return (
      <>
        <p className="flex justify-center text-2xl font-bold text-gray-700 mt-10">
          You have not ordered yet
        </p>
      </>
    );

  return (
    <div className=" min-h-screen p-6">
      <div className="w-full md:w-[90%] lg:w-[80%] mx-auto p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Your Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800 text-center">
                <th className="p-3 border border-gray-300">Product ID</th>
                <th className="p-3 border border-gray-300">Quantity</th>
                <th className="p-3 border border-gray-300">Total Amount</th>
                <th className="p-3 border border-gray-300">Payment Method</th>
                <th className="p-3 border border-gray-300">Order Date</th>
                <th className="p-3 border border-gray-300">Received</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
