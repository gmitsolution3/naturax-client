"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearCart, getCart, updateCartItems } from "@/utils/cartStorage";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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

export default function CheckoutForm() {
  const [cartItems, setCartItems] = useState<CheckoutProduct[]>([]);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    region: "",
    // postalCode: "",
    promoCode: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("inside");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updateCart = () => {
      const latestCart = getCart();
      setCartItems((prev) =>
        JSON.stringify(prev) !== JSON.stringify(latestCart) ? latestCart : prev,
      );
    };

    updateCart();
    window.addEventListener("cart_updated", updateCart);
    return () => window.removeEventListener("cart_updated", updateCart);
  }, []);

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

    // sync localStorage immediately
    updateCartItems(updatedItems);
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.productPrice * item.quantity;
  }, 0);

  const deliveryCharge = deliveryMethod === "inside" ? 80 : 100;

  const grandTotal = subtotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "phoneNumber",
      "streetAddress",
      "email",
      "city",
      "region",
    ];

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.success("Please enter a valid email address!");
      return;
    }

    const missingField = requiredFields.find(
      (field) => !formData[field as keyof typeof formData],
    );

    if (missingField) {
      toast.error(`${missingField} is required`);
      return;
    }

    const orderData = {
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber,
        email: formData.email,
      },
      shippingAddress: {
        street: formData.streetAddress,
        city: formData.city,
        region: formData.region,
        // postalCode: formData.postalCode,
      },
      products: cartItems.map((item) => ({
        productTitle: item.title,
        slug: item.slug,
        sku: item.sku,
        price: item.productPrice,
        quantity: item.quantity,
        variant: item.selectedVariant,
      })),
      subtotal: subtotal,
      deliveryCharge: deliveryCharge,
      grandTotal: grandTotal,
      paymentMethod: paymentMethod,
      deliveryMethod: deliveryMethod,
      promoCode: formData.promoCode,
      orderStatus: "pending",
      paymentStatus: "pending",
      sourceUrl: window.location.href,
    };

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order`,
        orderData,
      );

      if (response.data.success) {
        Swal.fire({
          title: response.data.message,
          text: `Order Id : ${response.data.orderId}`,
          icon: "success",
        });

        clearCart();

        router.push("/");

        // if (paymentMethod === "sslcommerz" && response.data.paymentUrl) {
        //   window.location.replace(response.data.paymentUrl);
        // } else {
        //   window.location.href = "/order-success";
        // }
      }
    } catch (error: any) {
      console.error("Order submission error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again letter.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-12">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-7xl">
          {/* Main Grid - Responsive */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Personal Information */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Personal information:
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="Enter Your First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Enter Your Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="w-16 rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm"
                          defaultValue="BD"
                        >
                          <option>BD</option>
                          {/* <option>US</option>
                          <option>UK</option> */}
                        </select>
                        <Input
                          type="tel"
                          name="phoneNumber"
                          placeholder="Enter Your Phone Number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="flex-1 border-gray-300 bg-gray-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Delivery Address:
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Select Region
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                    >
                      <option value="">Select</option>
                      <option value="dhaka">Dhaka</option>
                      <option value="chittagong">Chittagong</option>
                      <option value="sylhet">Sylhet</option>
                      <option value="khulna">Khulna</option>
                      <option value="rajshahi">Rajshahi</option>
                      <option value="rangpur">Rangpur</option>
                      <option value="barishal">Barishal</option>
                      <option value="mymensingh">Mymensingh</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Input
                        type="text"
                        name="city"
                        placeholder="Enter"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 bg-gray-50"
                      />
                    </div>
                    {/* <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <Input
                        type="text"
                        name="postalCode"
                        placeholder="Enter Your Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 bg-gray-50"
                      />
                    </div> */}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      House Number, Thana{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="streetAddress"
                      placeholder="Enter"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Promo Code:
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Apply Coupon/Promo
                    </label>
                    <Input
                      type="text"
                      name="promoCode"
                      placeholder="COUPON123"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 bg-gray-50"
                    />
                  </div>
                  <Button className="w-full text-white bg-primary">
                    Apply Now
                  </Button>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Delivery Method
                </h2>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <input
                      type="radio"
                      name="delivery"
                      value="inside"
                      checked={deliveryMethod === "inside"}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="h-4 w-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Inside Dhaka</p>
                      <p className="text-xs text-gray-500">2-3 Days</p>
                    </div>
                    <span className="font-semibold text-gray-900">৳80.00</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <input
                      type="radio"
                      name="delivery"
                      value="outside"
                      checked={deliveryMethod === "outside"}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="h-4 w-4" 
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Outside Dhaka</p>
                      <p className="text-xs text-gray-500">3-4 Days</p>
                    </div>
                    <span className="font-semibold text-gray-900">৳130.00</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Payment Method
                </h2>
                <p className="mb-4 text-xs text-gray-600">
                  All transaction are secure and encrypted
                </p>

                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <span className="flex-1 font-medium text-gray-900">
                        Cash on Delivery
                      </span>
                    </div>
                  </label>
                  {/* bkash */}
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={paymentMethod === "bkash"}
                        // onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <span className="flex-1 font-medium text-gray-900">
                        bkash
                      </span>
                      <div className="flex gap-2">
                        <span className="inline-block">
                          <img
                            src="https://i.postimg.cc/C1Q00cqc/BKash-b-Kash2-Logo-wine-removebg-preview.png"
                            alt="bkash"
                            className="h-20 w-30"
                          />
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* SSLCOMMERZ */}
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="sslcommerz"
                        checked={paymentMethod === "sslcommerz"}
                        // onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <span className="flex-1 font-medium text-gray-900">
                        SSLCOMMERZ
                      </span>
                      <div className="flex gap-2">
                        <span className="inline-block h-6 w-9 rounded bg-primary text-xs font-bold text-white items-center justify-center">
                          V
                        </span>
                        <span className="inline-block h-6 w-9 rounded bg-red-600 text-xs font-bold text-white items-center justify-center">
                          M
                        </span>
                        <span className="inline-block h-6 w-9 rounded bg-purple-600 text-xs font-bold text-white items-center justify-center">
                          AM
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Cart Items */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="h-20 w-20 rounded-lg bg-gray-100 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-gray-900">
                            ৳{" "}
                            {(item.productPrice * item.quantity).toLocaleString(
                              "en-BD",
                            )}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 rounded-md border border-gray-300">
                              <button
                                onClick={() =>
                                  handleQuantityChange(index, item.quantity - 1)
                                }
                                className="p-1 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(index, item.quantity + 1)
                                }
                                className="p-1 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Order Summary
                  </h2>
                  <div className="space-y-3 border-b pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Product:</span>
                      <span className="font-medium text-gray-900">
                        {cartItems.length.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ৳ {subtotal.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="font-medium text-gray-900">
                        ৳ {deliveryCharge}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 text-base font-bold">
                    <span className="text-gray-900">Grand Total</span>
                    <span className="text-gray-900">
                      ৳ {grandTotal.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full bg-primary py-2 text-white hover:bg-accent-foreground hover:cursor-pointer font-semibold"
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    <a href="#" className="underline hover:text-gray-700">
                      Read Terms and Conditions
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
