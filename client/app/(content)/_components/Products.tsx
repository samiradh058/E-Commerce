"use client";
import { useState } from "react";

import { deleteProduct, addProduct, updateProduct } from "../_utils/products";
import EachProduct from "./EachProduct";
import Spinner from "./Spinner";
import ProductFilter from "./ProductFilter";
import { useProducts } from "@/app/_customHooks/useProducts";
import ProductModal from "./ProductModal";

interface Product {
  productId: string;
  name: string;
  price: number;
  image: File | string;
  description: string;
  category: string;
  quantity: number;
  qna: { question: string; answer: string }[];
  brand: string;
  review: { author: string; comments: string }[];
  rating: number;
  onDelete: (productId: string) => void;
  onEdit: (product: Product) => void;
  isAdmin: boolean;
  imagePreview?: string;
}

export default function Products() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<
    Omit<Product, "onDelete" | "onEdit" | "isAdmin" | "productId">
  >({
    name: "",
    price: 0,
    image: new File([], ""),
    description: "",
    category: "All",
    quantity: 0,
    qna: [],
    brand: "",
    rating: 0,
    review: [],
  });
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const [imagePreview, setImagePreview] = useState<string>("");

  const { products, isLoading, userRole, setProducts } = useProducts(
    priceFilter,
    category,
    sort
  );

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
    if (
      !newProduct.name.trim() ||
      !newProduct.brand.trim() ||
      !newProduct.description.trim() ||
      newProduct.price <= 0 ||
      newProduct.quantity <= 0 ||
      newProduct.category.trim() === ""
    ) {
      alert("Please fill in all fields correctly before adding the product.");
      return;
    }

    try {
      const data = await addProduct(newProduct);
      if (data) {
        setProducts([...products, data.product]);
        setShowModal(false);
        setNewProduct({
          name: "",
          price: 0,
          image: new File([], ""),
          description: "",
          category: "All",
          quantity: 0,
          qna: [],
          brand: "",
          rating: 0,
          review: [],
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
      image: product.image,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      qna: product.qna,
      brand: product.brand,
      rating: product.rating,
      review: product.review,
    });

    if (product.image instanceof File) {
      setImagePreview(URL.createObjectURL(product.image));
    } else {
      setImagePreview(product.image);
    }

    setShowModal(true);
  }

  async function handleEditProduct() {
    if (!currentProduct) return;

    try {
      const data = await updateProduct(currentProduct.productId, newProduct);
      if (data.success) {
        console.log("Product updated successfully:", data);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === currentProduct.productId
              ? {
                  ...product,
                  ...newProduct,
                  image:
                    newProduct.image instanceof File
                      ? URL.createObjectURL(newProduct.image)
                      : newProduct.image,
                }
              : product
          )
        );
        setCurrentProduct(null);
        setShowModal(false);
        setNewProduct({
          name: "",
          price: 0,
          image: new File([], ""),
          description: "",
          category: "All",
          quantity: 0,
          qna: [],
          brand: "",
          rating: 0,
          review: [],
        });
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  }

  if (isLoading) {
    return <Spinner />;
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
      <ProductFilter
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        setCategory={setCategory}
        setSort={setSort}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products
          ?.filter((product) => userRole === "admin" || product.quantity > 0)
          .map((product) => (
            <EachProduct
              key={product.productId}
              {...product}
              image={
                typeof product.image === "string" ? product.image : "/icon.png"
              }
              onDelete={deleteSpecificProduct}
              onEdit={editProduct}
              isAdmin={userRole === "admin"}
            />
          ))}
      </ul>
      {showModal && (
        <ProductModal
          currentProduct={currentProduct}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          setShowModal={setShowModal}
          setCurrentProduct={(product) =>
            setCurrentProduct(product as Product | null)
          }
          handleEditProduct={handleEditProduct}
          handleAddProduct={handleAddProduct}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      )}
    </div>
  );
}
