"use client";

import {
  deleteProduct,
  getProducts,
  addProduct,
  updateProduct,
} from "../_utils/products";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "../_utils/user";
import EachProduct from "./EachProduct";

interface Product {
  productId: string;
  name: string;
  price: number;
  // image: string;
  description: string;
  category: string;
  quantity: number;
  onDelete: (productId: string) => void;
  onEdit: (product: Product) => void;
  isAdmin: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [userRole, setUserRole] = useState<string>("user");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    // image: "",
    description: "",
    category: "All",
    quantity: 0,
  });
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      const filteredProducts = data.filter(
        (item: Product) =>
          item.price >= priceFilter.min &&
          item.price <= (priceFilter.max || Infinity)
      );
      const categorisedProducts =
        category === "All"
          ? filteredProducts
          : filteredProducts.filter(
              (item: Product) => item.category === category
            );
      const searchedProducts =
        search.trim() === ""
          ? categorisedProducts
          : categorisedProducts.filter((item: Product) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            );
      const sortedProducts = () => {
        const sortedArray = [...searchedProducts];
        switch (sort) {
          case "A-Z":
            sortedArray.sort((a: Product, b: Product) =>
              a.name.localeCompare(b.name)
            );
            break;
          case "Z-A":
            sortedArray.sort((a: Product, b: Product) =>
              b.name.localeCompare(a.name)
            );
            break;
          case "High-Low":
            sortedArray.sort((a: Product, b: Product) => b.price - a.price);
            break;
          case "Low-High":
            sortedArray.sort((a: Product, b: Product) => a.price - b.price);
            break;
          default:
            break;
        }

        return sortedArray;
      };
      setProducts(sortedProducts());
    }

    async function fetchUser() {
      const data = await checkLoggedIn();
      setUserRole(data.user?.role);
    }

    fetchProducts();
    fetchUser();
  }, [priceFilter, category, search, sort]);

  async function deleteSpecificProduct(productId: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const data = await deleteProduct(productId);
    if (data.success) {
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } else {
      alert("Failed to delete product");
    }
  }

  async function handleAddProduct() {
    try {
      const data = await addProduct(newProduct);
      if (data) {
        setProducts([...products, data.product]);
        setShowModal(false);
        setNewProduct({
          name: "",
          price: 0,
          // image: "",
          description: "",
          category: "All",
          quantity: 0,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  function editProduct(product: Product) {
    setCurrentProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      // image: product.image,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
    });
    setShowModal(true);
  }

  async function handleEditProduct() {
    if (!currentProduct) return;

    try {
      const data = await updateProduct(currentProduct.productId, newProduct);
      if (data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === currentProduct.productId
              ? { ...product, ...newProduct }
              : product
          )
        );
        setCurrentProduct(null);
        setShowModal(false);
        setNewProduct({
          name: "",
          price: 0,
          // image: "",
          description: "",
          category: "All",
          quantity: 0,
        });
      }
    } catch (error) {
      console.error("Error editing product:", error);
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
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 items-center">
          <h2>Filter (Price):</h2>
          <input
            type="number"
            placeholder="Min (Rs.)"
            value={priceFilter.min === 0 ? "" : priceFilter.min}
            onChange={(e) => {
              if (Number(e.target.value) >= 0) {
                setPriceFilter({ ...priceFilter, min: Number(e.target.value) });
              }
            }}
            className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
          />
          <input
            type="number"
            placeholder="Max (Rs.)"
            value={priceFilter.max === 0 ? Infinity : priceFilter.max}
            onChange={(e) => {
              if (Number(e.target.value) >= 0) {
                setPriceFilter({ ...priceFilter, max: Number(e.target.value) });
              }
            }}
            className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
          />
        </div>
        <div className="flex gap-2 items-center">
          <h2>Select Category</h2>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
          >
            <option value="All">All</option>
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <h2>Search</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
          />
        </div>
        <div className="flex gap-2 items-center">
          <h2>Sort</h2>
          <select
            name="sort"
            id="sort"
            className="w-44 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="" disabled>
              Select Sorting
            </option>
            <option value="A-Z">Alphabetical (A-Z)</option>
            <option value="Z-A">Alphabetical (Z-A)</option>
            <option value="High-Low">Price (High-Low)</option>
            <option value="Low-High">Price (Low-High)</option>
          </select>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products?.length > 0 &&
          products.map((product: Product) => (
            <EachProduct
              key={product.productId}
              {...product}
              onDelete={deleteSpecificProduct}
              onEdit={editProduct}
              isAdmin={userRole === "admin"}
            />
          ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">
              {currentProduct ? "Edit Product" : "Add New Product"}
            </h2>

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
              <option value="All">All</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
            </select>

            {/* <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            /> */}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => (
                  setShowModal(false),
                  setCurrentProduct(null),
                  setNewProduct({
                    name: "",
                    price: 0,
                    // image: "",
                    description: "",
                    category: "All",
                    quantity: 0,
                  })
                )}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={currentProduct ? handleEditProduct : handleAddProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                {currentProduct ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
