// components/marquee/MarqueeForm.tsx
"use client";

import { useState, useEffect, use } from "react";
import {
  Save,
  Edit2,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface MarqueeData {
  _id?: string;
  text: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface MarqueeFormProps {
  onSuccess?: () => void;
}

export default function MarqueeForm({ onSuccess }: MarqueeFormProps) {
  const [marqueeData, setMarqueeData] = useState<MarqueeData>({
    text: "",
    isActive: true,
  });
  const [existingMarquee, setExistingMarquee] = useState<MarqueeData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadPrevious, setLoadPrevious] = useState(false);
  const [previousMarquee, setPreviousMarquee] = useState<MarqueeData[] | null>(
    null,
  );

  // Fetch existing marquee data
  useEffect(() => {
    fetchMarqueeData();
  }, []);

  const fetchPreviousMarquee = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/marquee/get-all-marquee`,
      );
      const data = await response.json();


      if (data.success && data.data) {
        setPreviousMarquee(data.data);
      }
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch previous marquee");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (loadPrevious) {
      
      fetchPreviousMarquee();
    }
  }, [loadPrevious]);

  const fetchMarqueeData = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/marquee/get-marquee`,
      );
      const data = await response.json();

      if (data.success && data.data) {
        setExistingMarquee(data.data);
        setMarqueeData(data.data);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching marquee:", err);
      setError("Failed to load marquee data");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!marqueeData.text.trim()) {
      setError("Marquee text is required");
      return;
    }

    

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = existingMarquee
        ? `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/marquee/update-marquee/${existingMarquee._id}`
        : `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/marquee/created`;
      const method = existingMarquee ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(marqueeData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(
          existingMarquee
            ? "Marquee updated successfully!"
            : "Marquee created successfully!",
        );
        setExistingMarquee(data.data);
        onSuccess?.();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error saving marquee:", err);
      setError("Failed to save marquee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActiveMiddleWare = (marquee: MarqueeData) => {
    const activeOne = previousMarquee?.find((p) => p.isActive === true);

    if (!marquee.isActive && activeOne && activeOne._id !== marquee._id) {
      Swal.fire({
        icon: "warning",
        title: "Already Active",
        text: "Another marquee is already active. Deactivate it first.",
      });
      return;
    }

    setExistingMarquee(marquee);
    handleToggleActive();
  };

  const handleToggleActive = async () => {
    if (!existingMarquee) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/marquee/toggle/${existingMarquee._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !existingMarquee.isActive }),
        },
      );

      const data = await response.json();



      if (data.success) {
        setMarqueeData((prev) => ({ ...prev, isActive: !prev.isActive }));
        setExistingMarquee((prev) =>
          prev ? { ...prev, isActive: !prev.isActive } : null,
        );
        setSuccess(
          `Marquee ${marqueeData.isActive ? "deactivated" : "activated"}!`,
        );

          setPreviousMarquee((prev) =>
            prev
              ? prev.map((p) =>
                  p._id === existingMarquee._id
                    ? { ...p, isActive: !p.isActive }
                    : p,
                )
              : prev,
          );

      }
    } catch (err) {
      setError("Failed to toggle status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarqueeData((prev) => ({ ...prev, text: e.target.value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleDelete = (id: string) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/marquee/delete/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = await response.json();

        if (data.success) {
          toast.success("Marquee deleted successfully");

          setPreviousMarquee((prev: any) =>
            prev?.filter((item: any) => item._id !== id),
          );
        }
      }
    });
  };

  // Preview the marquee
  const marqueePreview = marqueeData.text;

  if (isFetching) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Marquee Banner Management
        </h1>
        <p className="text-gray-600">
          Add or update scrolling banner text that appears on your website
        </p>
      </div>

      {/* Preview Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Live Preview
        </h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee py-3">
              <span className="text-lg font-medium text-gray-800 mx-8">
                {marqueePreview}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${marqueeData.isActive ? "bg-green-500" : "bg-gray-400"}`}
              ></div>
              <span
                className={`text-sm font-medium ${marqueeData.isActive ? "text-green-600" : "text-gray-500"}`}
              >
                {marqueeData.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {existingMarquee && (
              <button
                onClick={handleToggleActive}
                disabled={isLoading}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  marqueeData.isActive
                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                }`}
              >
                {marqueeData.isActive ? (
                  <>
                    <ToggleLeft size={16} />
                    Deactivate
                  </>
                ) : (
                  <>
                    <ToggleRight size={16} />
                    Activate
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          {/* Form Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {existingMarquee ? "Update Marquee" : "Create New Marquee"}
            </h2>
            {existingMarquee && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Edit2 size={14} />
                <span>
                  Last updated:{" "}
                  {new Date(
                    existingMarquee.updatedAt || "",
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marquee Text <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">
                (Supports HTML tags for styling)
              </span>
            </label>
            <textarea
              value={marqueeData.text}
              onChange={handleTextChange}
              placeholder="Enter your scrolling banner text here..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              disabled={isLoading}
            />
            <div className="mt-2 text-sm text-gray-500">
              Character count: {marqueeData.text.length}/500
            </div>

            {/* Example Text */}

            {!marqueeData.text && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm font-medium text-blue-800 mb-1">
                  Example:
                </div>
                <div className="text-sm text-blue-700">
                  🔥 ফ্রি ডেলিভারি সারা বাংলাদেশে | ক্যাশ অন ডেলিভারি | ৭ দিনের
                  রিটার্ন গ্যারান্টি | ১০০% অরিজিনাল প্রোডাক্ট 🔥
                </div>
              </div>
            )}
          </div>

          {/* Active Status */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marqueeData.isActive}
                onChange={(e) =>
                  setMarqueeData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={isLoading}
              />
              <div>
                <div className="font-medium text-gray-700">Active Status</div>
                <div className="text-sm text-gray-500">
                  When active, the marquee will be visible on the website
                </div>
              </div>
            </label>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <div className="text-red-700 text-sm">{error}</div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-green-700 text-sm font-medium">
                {success}
              </div>
            </div>
          )}

          {previousMarquee && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-xl">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Text</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Created At</th>
                    <th className="px-4 py-2 text-left">Updated At</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {previousMarquee!.map((marquee) => (
                    <tr key={marquee._id} className="border-t">
                      <td className="px-4 py-2">{marquee.text}</td>
                      <td className="px-4 py-2">
                        {marquee.isActive ? (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(marquee.createdAt!).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(marquee.updatedAt!).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 flex gap-2 items-center justify-center">
                        <button
                          className={`px-3 py-1 rounded-lg text-white ${
                            marquee.isActive ? "bg-red-500" : "bg-green-500"
                          }`}
                          onClick={() => handleToggleActiveMiddleWare(marquee)}
                        >
                          {marquee.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          className={`px-3 py-1 rounded-lg text-white bg-red-500`}
                          onClick={() => handleDelete(marquee._id!)}
                        >
                          Drop
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {existingMarquee
                ? "Update the existing marquee banner"
                : "Create a new marquee banner for your website"}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setLoadPrevious(true);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                disabled={isLoading}
              >
                Load Previous Data
              </button>

              <button
                type="submit"
                disabled={isLoading || !marqueeData.text.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
              >
                <Save size={18} />
                {isLoading
                  ? "Processing..."
                  : existingMarquee
                    ? "Update Marquee"
                    : "Create Marquee"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">💡 How to Use</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Add your promotional text in the text area above</li>
          <li>• Use | (pipe) symbol to separate different offers</li>
          <li>• You can use emojis for better visual appeal</li>
          <li>• Toggle the active status to show/hide on website</li>
          <li>• Only one marquee can be active at a time</li>
        </ul>
      </div>

      {/* Add custom animation for preview */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
