"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { User, ShoppingBag, RotateCcw, LogOut, ChevronDown, Heart } from "lucide-react";

export default function AccountDropdown() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    setOpen(false);
  };

  return (
    <div className="relative">
      
      {/* Toggle Button */}
      {!isAuthenticated ? (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          <User className="w-5 h-5 text-gray-700" />
          <ChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      {/* Dropdown Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden">
            
            {!isAuthenticated ? (
              <div className="py-1">
                <Link
                  href="/auth/sign-in"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Tracking</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Return Policy</span>
                </Link>
              </div>
            ) : (
              <div className="py-1">
                
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Tracking</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Return Policy</span>
                </Link>

                {/* Logout */}
                <div className="border-t border-gray-100 mt-1">
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
        </>
      )}
    </div>
  );
}