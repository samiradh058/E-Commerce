import Products from "./_components/Products";

export default function Main() {
  return (
    <div className="bg-gray-100 flex-grow p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Items:</h2>
      <Products />
    </div>
  );
}
