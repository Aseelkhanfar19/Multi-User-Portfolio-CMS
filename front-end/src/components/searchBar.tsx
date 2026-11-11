import { useState } from "react";
import type { FormEvent } from "react";
import ResponsiveContainer from "./ResponsiveContainer";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-12 sm:py-16 lg:py-20">
      <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-600 px-4 mb-8 sm:mb-10">
        Discover developers and explore their work.
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <ResponsiveContainer className="md:gap-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="username , user id ....."
            aria-label="Search developers"
            className="flex-1 min-w-0 px-4 py-3 bg-white text-gray-800 placeholder:text-gray-500 placeholder:font-medium border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03324D]"
          />
          <button
            type="submit"
            className="w-full md:w-40 bg-[#03324D] hover:bg-[#022438] text-white px-4 py-3 rounded-sm font-medium transition-colors duration-150"
          >
            Search
          </button>
        </ResponsiveContainer>
      </form>
    </section>
  );
}

export default SearchBar;