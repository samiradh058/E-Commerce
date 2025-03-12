"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../_components/BackButton";
import { fetchUsers } from "../_utils/user";

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

  useEffect(() => {
    async function loadUsers() {
      const result = await fetchUsers();
      if (result?.data) {
        setUsers(result.data);
        setLoading(false);
      } else {
        router.replace("/");
        setLoading(false);
      }
    }
    loadUsers();
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

      <div className="w-full md:w-[80%] mx-auto">
        <h2 className="font-semibold text-2xl text-textPrimary text-center mb-6">
          Users are:
        </h2>

        <div className="grid grid-cols-10 gap-4 bg-gray-200 p-4 rounded-lg font-semibold text-textPrimary">
          <div className="col-span-4 flex justify-center">Name</div>
          <div className="col-span-6 flex justify-center">Email</div>
        </div>

        <div className="space-y-4 mt-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-cardBg shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <ul className="grid grid-cols-10 gap-4 items-center text-textPrimary">
                <li className="col-span-4 text-lg font-medium flex justify-center">
                  {user.name}
                </li>
                <li className="col-span-6 text-lg font-medium flex justify-center">
                  {user.email}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
