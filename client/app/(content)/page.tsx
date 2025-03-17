import Products from "./_components/Products";
import Search from "./_components/Search";

export default async function Main() {
  return (
    <div className="flex-grow p-6">
      <div className="flex justify-between items-center mb-8 relative">
        <h2 className="text-2xl font-bold text-center flex-grow">
          Available Items:
        </h2>

        <div className="flex justify-end absolute right-0">
          <Search />
        </div>
      </div>

      <Products />
    </div>
  );
}
