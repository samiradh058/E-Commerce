import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="flex items-center justify-center p-4">
      <form className="w-full max-w-md">
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            className="w-full h-10 px-4 py-2 text-gray-700 focus:outline-none"
            placeholder="Search for products..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 flex items-center justify-center hover:bg-blue-600 rounded-full transition-colors duration-300 h-10"
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
}
