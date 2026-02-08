"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { User, ShoppingBag, RotateCcw, LogOut, ChevronDown } from "lucide-react";

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
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold"
        >
          <User className="w-4 h-4" />
          <span>Account</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <button
          className="flex items-center gap-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all duration-200">
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
          <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            
            {!isAuthenticated ? (
              <div className="py-2">
                <Link
                  href="/auth/sign-in"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Sign In</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Order Tracking</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Return Policy</span>
                </Link>
              </div>
            ) : (
              <div className="py-2">
                
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold shadow-sm">
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
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>My Profile</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Order Tracking</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-150 group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Return Policy</span>
                </Link>

                {/* Logout */}
                <div className="border-t border-gray-200 mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-150 group"
                  >
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
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