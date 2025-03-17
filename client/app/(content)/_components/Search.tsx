"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [searchString, setSearchString] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchString(query);
    } else {
      setSearchString("");
    }
  }, [searchParams]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchString.trim()) {
      const params = new URLSearchParams(window.location.search);
      params.set("search", searchString);

      router.push(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form className="w-full max-w-md" onSubmit={handleSearch}>
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
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
