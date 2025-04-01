"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../_components/BackButton";
import { fetchUsers } from "../_utils/user";
import { fetchAllOrderItems } from "../_utils/products";

export default function Cart() {
  const router = useRouter();
  const [users, setUsers] = useState<
    | {
        name: string;
        email: string;
      }[]
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const [orderItems, setOrderItems] = useState<
    {
      productName: string;
      userName: string;
      userEmail: string;
      orderDate: string;
      updatedDate: string;
      receivedStatus: boolean;
    }[]
  >([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [users, orderedItems] = await Promise.all([
          fetchUsers(),
          fetchAllOrderItems(),
        ]);

        if (!users || !orderedItems) {
          alert("Could not fetch users or orderedItems");
          router.replace("/");
          return;
        } else {
          setUsers(users.data || []);
          setOrderItems(orderedItems.data || []);
        }
      } catch (error) {
        console.error("Error fetching users or orderedItems ", error);
        alert("Failed fetching data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center text-[32px] font-bold">
        Loading...
      </div>
    );
  }
  if (!users || users.length === 0)
    return (
      <>
        <div>
          <BackButton />
        </div>
        <p className="flex justify-center text-[32px] font-bold">
          No users available
        </p>
      </>
    );

  return (
    <div className="bg-background min-h-screen p-6">
      <div>
        <BackButton />
      </div>

      <div className="w-full md:w-[50%] mx-auto">
        <h2 className="font-semibold text-2xl text-textPrimary text-center mb-6">
          Users List
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-all border-b border-gray-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-4 font-medium">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex justify-center mt-16 font-semibold text-2xl">
          List of Orders Not Delivered
        </div>

        <div className="w-full mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Order Date</th>
                <th className="border border-gray-300 px-4 py-2">
                  Updated Date
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Received Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems.length > 0 ? (
                orderItems.map(
                  (order, index) =>
                    order.receivedStatus === false && (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 transition-all border-b border-gray-300"
                      >
                        <td className="border border-gray-300 px-4 py-2">
                          {order.productName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {order.userName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {order.userEmail}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(order.updatedDate).toLocaleDateString()}
                        </td>
                        <td
                          className={`border border-gray-300 px-4 py-2 font-semibold ${
                            order.receivedStatus
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.receivedStatus ? "Received" : "Not Received"}
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 font-medium">
                    No orders available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
