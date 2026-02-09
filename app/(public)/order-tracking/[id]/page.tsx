import React from "react";
import { Package, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface CourierStatusData {
  status: number;
  delivery_status: string;
}

// Define status configuration
const statusConfig: Record<string, {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  steps: { current: boolean; completed: boolean; label: string }[];
}> = {
  pending: {
    title: "Order Pending",
    description: "Your consignment is not delivered or cancelled yet.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    steps: [
      { current: true, completed: true, label: "Order Placed" },
      { current: true, completed: false, label: "In Transit" },
      { current: false, completed: false, label: "Out for Delivery" },
      { current: false, completed: false, label: "Delivered" },
    ],
  },
  delivered_approval_pending: {
    title: "Awaiting Approval",
    description: "Consignment is delivered but waiting for admin approval.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    steps: [
      { current: false, completed: true, label: "Order Placed" },
      { current: false, completed: true, label: "In Transit" },
      { current: false, completed: true, label: "Out for Delivery" },
      { current: true, completed: false, label: "Awaiting Approval" },
    ],
  },
  partial_delivered_approval_pending: {
    title: "Partial Delivery - Awaiting Approval",
    description: "Consignment is delivered partially and waiting for admin approval.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    steps: [
      { current: false, completed: true, label: "Order Placed" },
      { current: false, completed: true, label: "In Transit" },
      { current: true, completed: false, label: "Partially Delivered" },
      { current: false, completed: false, label: "Awaiting Approval" },
    ],
  },
  cancelled_approval_pending: {
    title: "Cancellation Pending Approval",
    description: "Consignment is cancelled and waiting for admin approval.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    steps: [
      { current: false, completed: true, label: "Order Placed" },
      { current: true, completed: false, label: "Cancellation Requested" },
      { current: false, completed: false, label: "Awaiting Approval" },
      { current: false, completed: false, label: "Cancelled" },
    ],
  },
  delivered: {
    title: "Delivered Successfully",
    description: "Consignment is delivered and balance added.",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    steps: [
      { current: false, completed: true, label: "Order Placed" },
      { current: false, completed: true, label: "In Transit" },
      { current: false, completed: true, label: "Out for Delivery" },
      { current: false, completed: true, label: "Delivered" },
    ],
  },
  partial_delivered: {
    title: "Partially Delivered",
    description: "Consignment is partially delivered and balance added.",
    icon: <AlertCircle className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    steps: [
      { current: false, completed: true, label: "Order Placed" },
      { current: false, completed: true, label: "In Transit" },
      { current: true, completed: false, label: "Partially Delivered" },
      { current: false, completed: false, label: "Remaining Items" },
    ],
  },
  cancelled: {
    title: "Order Cancelled",
    description: "Consignment is cancelled and balance updated.",
    icon: <XCircle className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    steps: [
      { current: false, completed: true, label: "Order Placed" },
      { current: true, completed: false, label: "Cancellation Requested" },
      { current: false, completed: false, label: "Approved" },
      { current: false, completed: false, label: "Cancelled" },
    ],
  },
  hold: {
    title: "On Hold",
    description: "Consignment is held.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    steps: [
      { current: false, completed: true, label: "Order Placed" },
      { current: true, completed: false, label: "On Hold" },
      { current: false, completed: false, label: "Resuming" },
      { current: false, completed: false, label: "Processing" },
    ],
  },
  in_review: {
    title: "Order in Review",
    description: "Order is placed and waiting to be reviewed.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    steps: [
      { current: true, completed: false, label: "Order Placed" },
      { current: false, completed: false, label: "Under Review" },
      { current: false, completed: false, label: "Approval" },
      { current: false, completed: false, label: "Processing" },
    ],
  },
  unknown_approval_pending: {
    title: "Unknown Status - Contact Support",
    description: "Unknown Pending status. Need contact with the support team.",
    icon: <AlertCircle className="w-6 h-6" />,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    steps: [
      { current: true, completed: false, label: "Unknown Status" },
      { current: false, completed: false, label: "Contact Support" },
      { current: false, completed: false, label: "Resolution" },
      { current: false, completed: false, label: "Update" },
    ],
  },
  unknown: {
    title: "Unknown Status",
    description: "Unknown status. Need contact with the support team.",
    icon: <AlertCircle className="w-6 h-6" />,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    steps: [
      { current: true, completed: false, label: "Unknown Status" },
      { current: false, completed: false, label: "Contact Support" },
      { current: false, completed: false, label: "Investigation" },
      { current: false, completed: false, label: "Resolution" },
    ],
  },
};

// Default status for fallback
const defaultStatus = {
  title: "Order Status",
  description: "Fetching your order status...",
  icon: <Package className="w-6 h-6" />,
  color: "text-gray-600",
  bgColor: "bg-gray-100",
  steps: [
    { current: true, completed: false, label: "Fetching" },
    { current: false, completed: false, label: "Loading" },
    { current: false, completed: false, label: "Processing" },
    { current: false, completed: false, label: "Complete" },
  ],
};

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let courierData: CourierStatusData | null = null;
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/courier/order-status/${id}`,
      {
        cache: 'no-store', // For dynamic data
        next: { tags: [`order-${id}`] } // Optional: for revalidation
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch order status: ${res.status}`);
    }

    courierData = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch order status";
    console.error("Error fetching order status:", err);
  }

  const status = courierData?.delivery_status || "unknown";
  const statusInfo = statusConfig[status] || defaultStatus;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
          <p className="text-gray-600">Tracking ID: <span className="font-mono font-medium">{id}</span></p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className={`p-6 ${statusInfo.bgColor}`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                {statusInfo.icon}
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${statusInfo.color}`}>
                  {statusInfo.title}
                </h2>
                <p className="text-gray-700 mt-1">{statusInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Status Steps */}
          <div className="p-6">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-300">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500"
                  style={{ 
                    width: '100%',
                    height: `${(statusInfo.steps.filter(s => s.completed).length / (statusInfo.steps.length - 1)) * 100}%` 
                  }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-8 relative">
                {statusInfo.steps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : step.current 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-6">
                      <p className={`text-sm font-medium ${
                        step.current ? 'text-blue-600' : 
                        step.completed ? 'text-green-600' : 
                        'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {step.current ? 'Current status' : 
                         step.completed ? 'Completed' : 
                         'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tracking Number</p>
                <p className="font-medium">{id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <p className={`font-medium ${statusInfo.color}`}>{status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status Code</p>
                <p className="font-mono font-medium">{courierData?.status || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help? Contact our support team at{" "}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}