import Products from "./_components/Products";
import { getProducts } from "./_utils/products";

export default async function Main() {
  const products = await getProducts();
  return (
    <div className="flex-grow p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Items:</h2>
      <Products items={products} />
    </div>
  );
}
