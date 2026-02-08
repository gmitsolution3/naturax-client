"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HeaderSearchBar({ categories, name, phone }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "in", selectCategory);
  };

  return (
    <div className="w-full">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex items-stretch border border-gray-300 rounded-md overflow-hidden bg-white hover:border-gray-400 focus-within:border-primary transition-colors duration-200">
          
          {/* Category Dropdown - Desktop Only */}
          <div className="relative hidden md:flex items-center border-r border-gray-300">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap bg-white"
            >
              <span className="max-w-[120px] truncate">{selectCategory}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[60]"
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Menu */}
                <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-[70] max-h-96 overflow-auto">
                  <div className="py-1">
                    <button
                      type="button"
                      className="block w-full px-4 py-2.5 text-left text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => {
                        setSelectCategory("All Categories");
                        setIsOpen(false);
                      }}
                    >
                      All Categories
                    </button>
                    {categories?.map((category: any) => (
                      <Link
                        href={`/shop/${category._id}`}
                        key={category._id}
                        onClick={() => setIsOpen(false)}
                      >
                        <button
                          type="button"
                          className="block w-full px-4 py-2.5 text-left text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors duration-150 capitalize"
                          onClick={() => setSelectCategory(category.name)}
                        >
                          {category.name}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full h-full px-4 py-2.5 text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 bg-primary text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}