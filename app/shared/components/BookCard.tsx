"use client";

import { getCart } from "@/utils/cartStorage";
import { ShoppingCart, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const BookCard = ({ categories }: any) => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectCategory, setSelectCategory] =
    useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
      setCartCount(getCart().length);
    };

    updateCart();
    window.addEventListener("cart_updated", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "in", selectCategory);
    // Close search after submission on mobile
    if (window.innerWidth < 768) {
      setIsSearchOpen(false);
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById(
        "search-container",
      );
      const searchIcon = document.getElementById("search-icon");

      if (
        isSearchOpen &&
        searchContainer &&
        !searchContainer.contains(event.target as Node) &&
        searchIcon &&
        !searchIcon.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const cartSubTotal = cart.reduce(
    (acc, item: any) => acc + item.productPrice * item.quantity,
    0,
  );

  const cartItemLength = cart.reduce((acc, item: any) => acc + item.quantity, 0);


  return (
    <div className="flex items-center gap-2">
      {/* Search Icon Button */}
      <button
        id="search-icon"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 hidden lg:block"
      >
        <div className="relative">
          <Search className="w-5 h-5 text-gray-700 transition-colors duration-200" />
        </div>
      </button>

      {/* Search Dropdown/Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] md:absolute md:inset-auto md:top-full md:left-0 md:right-0 md:mt-2">
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Search Container */}
          <div
            id="search-container"
            className="relative w-full max-w-2xl mx-auto md:shadow-lg"
          >
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-stretch border border-gray-300 rounded-md overflow-hidden bg-white hover:border-gray-400 focus-within:border-primary transition-colors duration-200">
                {/* Category Dropdown */}
                <div className="relative hidden md:flex items-center border-r border-gray-300">
                  <button
                    type="button"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap bg-white"
                  >
                    <span className="max-w-[120px] truncate">
                      {selectCategory}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
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
                  {isCategoryOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-[60]"
                        onClick={() => setIsCategoryOpen(false)}
                      />

                      <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-[70] max-h-96 overflow-auto">
                        <div className="py-1">
                          <button
                            type="button"
                            className="block w-full px-4 py-2.5 text-left text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                            onClick={() => {
                              setSelectCategory("All Categories");
                              setIsCategoryOpen(false);
                            }}
                          >
                            All Categories
                          </button>
                          {categories?.map((category: any) => (
                            <Link
                              href={`/shop/${category._id}`}
                              key={category._id}
                              onClick={() => setIsCategoryOpen(false)}
                            >
                              <button
                                type="button"
                                className="block w-full px-4 py-2.5 text-left text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors duration-150 capitalize"
                                onClick={() =>
                                  setSelectCategory(category.name)
                                }
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
                    autoFocus
                  />
                </div>

                {/* Search Submit Button */}
                <button
                  type="submit"
                  className="px-4 md:px-6 bg-primary text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Close button for mobile */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="md:hidden px-4 text-gray-500 hover:text-gray-700 border-l border-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cart Icon Container */}
      <div className="relative group flex">
        <button
          onClick={() => router.push("/checkoutCart")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          {/* Icon with Badge */}
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200" />

            {/* Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {cartCount > 9 ? "9+" : cartItemLength}
              </span>
            )}
          </div>

          {/* Cart Info - Desktop Only */}
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-[10px] text-gray-500 leading-tight uppercase tracking-wide">
              Shopping Cart
            </span>
            <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
              ${cartCount > 0 ? cartSubTotal : "0.00"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
