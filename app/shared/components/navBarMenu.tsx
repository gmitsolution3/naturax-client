"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { User, ShoppingBag, RotateCcw, LogOut, Heart } from "lucide-react";

export const NavBarMenu = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    setDropdownOpen(false);
  };

  return (
    <div className="flex items-center gap-1">
      {!isAuthenticated ? (
        <>
          {/* Sign In Link */}
          <Link
            href="/auth/sign-in"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-gray-50"
          >
            <span>LOGIN / REGISTER</span>
          </Link>
        </>
      ) : (
        <div 
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {/* User Profile Button */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-gray-50">
            <User className="w-4 h-4" />
            <span className="max-w-[100px] truncate">
              {user?.name || "Account"}
            </span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
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
          {dropdownOpen && (
            <div className="absolute right-0 top-7 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-[100] overflow-hidden">
              <div className="py-1">
                
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Tracking</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Return Policy</span>
                </Link>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-150"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};