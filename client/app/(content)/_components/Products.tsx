"use client";

import Image from "next/image";
import Link from "next/link";
import { getProducts } from "../_utils/products";
import { addProduct } from "../_utils/products";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "../_utils/user";

interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

function EachProduct({
  productId,
  name,
  price,
  // image,
  description,
  category,
  quantity,
}: Product) {
  return (
    <Link
      href={`/product/${productId}`}
      key={productId}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
    >
      <div className="relative h-56 w-full">
        <Image src="/icon.png" alt="Item" fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="px-1 border-gray-300 border-2 h-fit rounded-md">
            {category}
          </p>
        </div>
        <p className="mb-1 text-stone-600">{description}</p>
        <p className="text-stone-900 font-semibold">Rs. {price}</p>
        <p className="text-stone-600">{quantity} remaining</p>
      </div>
    </Link>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [userRole, setUserRole] = useState<string>("user");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "All",
    quantity: 0,
  });

  async function fetchProducts() {
    const data = await getProducts();
    setProducts(data);
  }
  async function fetchUser() {
    const data = await checkLoggedIn();
    setUserRole(data.user.role);
  }

  useEffect(() => {
    fetchProducts();
    fetchUser();
  }, []);

  async function handleAddProduct() {
    try {
      const data = await addProduct(newProduct);
      if (data) {
        console.log("data after handling is ", data);
        setProducts([...products, data.product]);
        console.log("products are after adding ", products);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  return (
    <div>
      {userRole === "admin" && (
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Add Product
          </button>
        </div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.length > 0 &&
          products.map((product: Product) => (
            <EachProduct key={product.name} {...product} />
          ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity: Number(e.target.value),
                })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />

            <select
              name="category"
              id="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            >
              <option value="all">All</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>

            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
