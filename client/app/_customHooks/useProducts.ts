import { useState, useEffect } from "react";
import { getProducts } from "../(content)/_utils/products";
import { checkLoggedIn } from "../(content)/_utils/user";
import { useSearchParams } from "next/navigation";

interface Product {
  productId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  qna: { question: string; answer: string }[];
  brand: string;
  review: { author: string; comments: string }[];
  rating: number;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  userRole: string;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function useProducts(
  priceFilter: { min: number; max: number },
  category: string,
  sort: string
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string>("user");

  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, userData] = await Promise.all([
          getProducts(),
          checkLoggedIn(),
        ]);

        const searchedProducts = productsData.filter((item: Product) =>
          query ? item.name.toLowerCase().includes(query.toLowerCase()) : true
        );

        const filteredProducts = searchedProducts.filter(
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

        const sortedProducts = () => {
          const sortedArray = [...categorisedProducts];
          switch (sort) {
            case "A-Z":
              sortedArray.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case "Z-A":
              sortedArray.sort((a, b) => b.name.localeCompare(a.name));
              break;
            case "High-Low":
              sortedArray.sort((a, b) => b.price - a.price);
              break;
            case "Low-High":
              sortedArray.sort((a, b) => a.price - b.price);
              break;
            default:
              break;
          }
          return sortedArray;
        };

        setProducts(sortedProducts());
        setUserRole(userData.user?.role || "user");
      } catch (error) {
        console.error("Error fetching products and user details", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [priceFilter, category, sort, query]);

  return { products, isLoading, userRole, setProducts };
}
