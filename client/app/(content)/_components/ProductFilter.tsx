interface ProductFilterProps {
  priceFilter: { min: number; max: number };
  setPriceFilter: (filter: { min: number; max: number }) => void;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
}

export default function ProductFilter({
  priceFilter,
  setPriceFilter,
  setCategory,
  setSort,
}: ProductFilterProps) {
  return (
    <div className="flex justify-between mb-4">
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
  );
}
