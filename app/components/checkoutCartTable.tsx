import React, { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateCartItems } from "@/utils/cartStorage";
import Link from "next/link";

interface CheckoutProduct {
  productPrice: number;
  quantity: number;
  selectedColor: { name: string };
  selectedProductSize: string;
  selectedVariant: {
    attributes: { color: string; size: string };
    sku: string;
    stock: number;
  };
  sku: string;
  slug: string;
  thumbnail: string;
  title: string;
}

export default function CheckoutCartTableCompact({
  products,
}: {
  products: CheckoutProduct[];
}) {
  const [cartItems, setCartItems] = useState<CheckoutProduct[]>(products);
  const router = useRouter();

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;

    setCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const getTotalPrice = (item: any) => {
    return (item.productPrice * item.quantity).toLocaleString("en-BD");
  };

  const handleGoCheckout = () => {
    const normalizedCart = cartItems.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }));

    updateCartItems(normalizedCart);
    router.push("/checkout");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <Link href="/">
              <button className="mt-6 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Table - Desktop */}
            <div className="lg:col-span-2">
              <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Product
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                        Price
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                        Total
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        {/* Product */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            />
                            <div>
                              <Link href={`/product/${item.slug}`}>
                                <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer mb-1">
                                  {item.title}
                                </h3>
                              </Link>
                              <div className="flex gap-2 text-xs text-gray-600">
                                <span>{item.selectedColor.name}</span>
                                <span>•</span>
                                <span>{item.selectedProductSize}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-gray-900">
                            ৳{item.productPrice.toLocaleString("en-BD")}
                          </span>
                        </td>

                        {/* Quantity */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <div className="inline-flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleQuantityChange(index, item.quantity - 1)
                                }
                                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1;
                                  if (value >= 1) handleQuantityChange(index, value);
                                }}
                                className="w-12 h-9 text-center border-x border-gray-300 font-semibold outline-none"
                              />
                              <button
                                onClick={() =>
                                  handleQuantityChange(index, item.quantity + 1)
                                }
                                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-gray-900">
                            ৳{getTotalPrice(item)}
                          </span>
                        </td>

                        {/* Remove */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex gap-4 mb-4">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <div className="flex gap-2 text-xs text-gray-600 mb-2">
                          <span>{item.selectedColor.name}</span>
                          <span>•</span>
                          <span>{item.selectedProductSize}</span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ৳{item.productPrice.toLocaleString("en-BD")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="inline-flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(index, item.quantity - 1)
                          }
                          className="w-9 h-9 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-12 h-9 text-center border-x border-gray-300 font-semibold"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(index, item.quantity + 1)
                          }
                          className="w-9 h-9 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">
                          ৳{getTotalPrice(item)}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">৳{subtotal.toLocaleString("en-BD")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ৳{subtotal.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <button
                      onClick={handleGoCheckout}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-5"
                    >
                      Checkout
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}