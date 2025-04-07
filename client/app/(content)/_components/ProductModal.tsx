// import Image from "next/image";

import Image from "next/image";

interface ProductModalProps {
  name: string;
  price: number;
  quantity: number;
  brand: string;
  image: File | string;
  description: string;
  category: string;
  qna: { question: string; answer: string }[];
  review: { author: string; comments: string }[];
  rating: number;
  imagePreview?: string;
}

export default function ProductModal({
  currentProduct,
  newProduct,
  imagePreview,
  setImagePreview,
  setNewProduct,
  setShowModal,
  setCurrentProduct,
  handleEditProduct,
  handleAddProduct,
}: {
  currentProduct: ProductModalProps | null;
  newProduct: ProductModalProps;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  setNewProduct: React.Dispatch<React.SetStateAction<ProductModalProps>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentProduct: React.Dispatch<
    React.SetStateAction<ProductModalProps | null>
  >;
  handleEditProduct: () => void;
  handleAddProduct: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[60%]">
        <h2 className="text-lg font-semibold mb-4 flex justify-center">
          {currentProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="flex justify-around gap-4">
          <div>
            <div className="mt-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="price" className="text-gray-700">
                Price:
              </label>
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price > 0 ? newProduct.price : ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="quantity" className="text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity > 0 ? newProduct.quantity : ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: Number(e.target.value),
                  })
                }
                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="brand" className="text-gray-700">
                Brand:
              </label>
              <input
                type="string"
                placeholder="Brand"
                value={newProduct.brand}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    brand: e.target.value,
                  })
                }
                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="description" className="text-gray-700">
                Description:
              </label>
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="category" className="text-gray-700">
                Category:
              </label>
              <select
                name="category"
                id="category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              >
                <option value="All">All</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <label htmlFor="image" className="text-gray-700">
                Image:
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewProduct((prev) => ({ ...prev, image: file }));
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="w-fit h-fit p-2 border border-gray-300 rounded-md"
                />
                <div className="relative w-20 h-20">
                  {newProduct.image instanceof File &&
                    newProduct.image.name && (
                      <Image
                        src={URL.createObjectURL(newProduct.image)}
                        alt="Preview"
                        className="w-32 h-32 object-cover mt-2"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover mb-4 rounded"
                      fill
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2 overflow-auto">
              <label htmlFor="qna" className="text-gray-700">
                Questions:
              </label>
              {newProduct.qna.map((qnaItem, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <label>{qnaItem.question}</label>
                  <input
                    type="text"
                    value={qnaItem.answer}
                    onChange={(e) => {
                      setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        qna: prevProduct.qna.map((item, i) =>
                          i === index
                            ? { ...item, answer: e.target.value }
                            : item
                        ),
                      }));
                    }}
                    placeholder="Enter your answer"
                    className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => (
              setShowModal(false),
              setCurrentProduct(null),
              setNewProduct({
                name: "",
                price: 0,
                image: new File([], ""),
                description: "",
                category: "All",
                quantity: 0,
                qna: [],
                brand: "",
                review: [],
                rating: 0,
                imagePreview: "",
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
  );
}
