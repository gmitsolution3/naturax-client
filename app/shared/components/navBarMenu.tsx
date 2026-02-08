"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { User, ShoppingBag, RotateCcw, LogOut } from "lucide-react";

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
    <div className="hidden md:flex items-center gap-6">
      {!isAuthenticated ? (
        <>
          <Link
            href="/auth/sign-in"
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors duration-200 text-sm font-medium group"
          >
            <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>Sign In</span>
          </Link>
          
          <Link
            href="/order-tracking"
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors duration-200 text-sm font-medium group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>Track Order</span>
          </Link>
          
          <Link
            href="/return-policy"
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors duration-200 text-sm font-medium group"
          >
            <RotateCcw className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>Returns</span>
          </Link>
        </>
      ) : (
        <div 
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {/* User Profile Button */}
          <button className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors duration-200 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-shadow duration-200">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-sm font-medium max-w-[100px] truncate">
              {user?.name || "Account"}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
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
            <div className="absolute right-0 top-7 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>My Profile</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Order Tracking</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Return Policy</span>
                </Link>
                
                <hr className="my-2 border-gray-100" />
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-150 group"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
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