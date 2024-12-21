import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="flex items-center">
      <form>
        <div className="flex items-center bg-white rounded-md">
          <input
            type="text"
            className="w-60 h-8 rounded-l-md px-2 focus:outline-none focus:border-2 focus:border-stone-400 focus:border-r-0"
          />
          <div className="bg-gray-400 px-2 h-8 rounded-md flex justify-center items-center">
            <FaSearch />
          </div>
        </div>
      </form>
    </div>
  );
}
