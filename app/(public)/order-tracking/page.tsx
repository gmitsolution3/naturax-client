"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getOrderForUser } from "@/lib/order";
import { useState } from "react";
import { useEffect } from "react";
import { getOrderStatusClass } from "./../../admin/order/components/OrdersTable";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Truck } from "lucide-react";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
}

interface VariantAttributes {
  color?: string;
  size?: string;
  [key: string]: string | undefined;
}

interface OrderVariant {
  attributes: VariantAttributes;
  sku: string;
  stock: number;
}

interface OrderProduct {
  productId: string;
  title: string;
  slug: string;
  quantity: number;
  price: number;
  subtotal: number;
  variant: OrderVariant;
}

export interface Order {
  _id: string;
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  products: OrderProduct[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: string;
  deliveryMethod: string;
  promoCode: string;
  createdAt: string;
  courierName?: string;
  courierStatus?: string;
  note?: string;
  orderStatus?: "pending" | "confirmed" | "shipped" | "delivered";
  paymentStatus?: "pending" | "paid";
  courier?: {};
}

export default function OrderTracking() {
  const { user, loading: isUserLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      // Don't fetch if user is not available or email is missing
      if (!user || !user.email) {
        setIsOrderLoading(false);
        return;
      }

      try {
        setError(null);
        setIsOrderLoading(true);
        const res = await getOrderForUser(user.email);

        if (res?.data) {
          setOrders(res.data);
        } else {
          setOrders([]); // Set empty array if no data
        }
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);
        setError(
          err.message || "Failed to load orders. Please try again.",
        );
        setOrders([]);
      } finally {
        setIsOrderLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const isLoading = isUserLoading || isOrderLoading;

  const getFullAddress = (address: ShippingAddress) =>
    `${address.street}, ${address.city}, ${address.region}`;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-400 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your Orders
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track customer orders
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Loading your orders...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-400 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Orders
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track customer orders
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 font-semibold mb-2">
              Error Loading Orders
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No orders state
  if (!isLoading && orders.length === 0) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-400 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Orders
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track customer orders
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-400 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your Orders
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track customer orders
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Qty
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Track order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {order.customerInfo.firstName}{" "}
                        {order.customerInfo.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.customerInfo.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {getFullAddress(order.shippingAddress)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.products[0]?.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.products.length > 1 &&
                          `+${order.products.length - 1} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-900">
                        {order.products[0]?.variant.sku}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {order.products.reduce(
                          (sum, p) => sum + p.quantity,
                          0,
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        ৳{order.grandTotal.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <Badge
                          className={`text-xs flex justify-center ${getOrderStatusClass(
                            order.orderStatus,
                          )}`}
                        >
                          {order.orderStatus}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col justify-center items-center gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.paymentStatus === "pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.paymentStatus || "pending"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {order?.courier ? (
                          <Link href={`/order-tracking/${order._id}`}>
                            <button
                              className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                              title="Edit"
                            >
                              <Truck size={18} />
                            </button>
                          </Link>
                        ) : (
                          <button className="text-[12px] bg-primary text-white rounded p-2">Not Assigned</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-4 md:p-6">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">
                    {order.customerInfo.firstName}{" "}
                    {order.customerInfo.lastName}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    {order.customerInfo.email}
                  </p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    📍 LOCATION
                  </p>
                  <p className="text-sm text-gray-900">
                    {getFullAddress(order.shippingAddress)}
                  </p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                  {order.products.map((product, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-semibold text-gray-700 mb-1">
                        PRODUCT {idx + 1}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {product.title}
                      </p>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                        <div>
                          <p className="text-gray-600">SKU</p>
                          <p className="font-mono font-semibold text-gray-900">
                            {product.variant.sku}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Qty</p>
                          <p className="font-semibold text-gray-900">
                            {product.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Subtotal</p>
                          <p className="font-semibold text-gray-900">
                            ৳{product.subtotal}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Total:
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ৳{order.grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex gap-2">
                  <span
                    className={`flex-1 text-center py-1 rounded text-xs font-semibold ${
                      order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.orderStatus || "pending"}
                  </span>
                  <span
                    className={`flex-1 text-center py-1 rounded text-xs font-semibold ${
                      order.paymentStatus === "pending"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.paymentStatus || "pending"}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <button className="py-2 bg-blue-50 text-primary rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
