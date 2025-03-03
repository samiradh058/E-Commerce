import Products from "./_components/Products";

export default async function Main() {
  return (
    <div className="flex-grow p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Items:</h2>
      <Products />
    </div>
  );
}
