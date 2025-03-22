"use client";

import { useEffect, useState } from "react";
import { checkLoggedIn } from "../_utils/user";
import { buyProduct, getCartItemDetails } from "../_utils/products";

export default function Buy({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [phone] = useState("9800000001");
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    async function checkLogin() {
      const data = await checkLoggedIn();
      if (data && data.isAuthenticated) {
        setUserId(data.user._id);
        setName(data.user.name);
        setEmail(data.user.email);
      }
    }
    checkLogin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await buyProduct({
        userId,
        productId,
        total,
        name,
        email,
        address,
        phone,
      });
    } catch (error) {
      setError("Something went wrong. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async () => {
    if (!userId) {
      alert("Please login to continue");
      return;
    }
    const data = await getCartItemDetails(productId, userId);
    if (data && data.data) {
      setQuantity(Number(data.data.cartItem.quantity));
      setTotal(
        Number(data.data.cartProductPrice) * Number(data.data.cartItem.quantity)
      );
    }
    setIsOpen(true);
    setIsOpen(true);
  };

  return (
    <>
      <button
        key={productId}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        onClick={handleOpen}
      >
        Buy
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Complete Your Purchase
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                Full Name
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <label className="block">
                Email
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <label className="block">
                Shipping Address
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <label className="block">
                Phone Number
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  className="w-full p-2 border rounded-md"
                  disabled
                />
              </label>
              <label className="block">
                Quantity
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={quantity}
                  className="w-full p-2 border rounded-md"
                  disabled
                />
              </label>
              <label className="block">
                Total
                <input
                  type="number"
                  name="total"
                  min="1"
                  value={total}
                  className="w-full p-2 border rounded-md"
                  disabled
                />
              </label>
              {error && (
                <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Purchase"}
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 py-2 rounded-md mt-2 hover:bg-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
