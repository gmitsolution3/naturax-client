import { ProductFormData } from "@/utils/product";
import React from "react";
import ProductVariants from "./ProductVariants";
import ProductImage from "./productImage";
import YouTubeVideoPlayer from "./youtubeVideoPlayer";
import { Tag, TrendingUp, Shield, Truck } from "lucide-react";

interface ProductDetailsProps {
  product: ProductFormData;
}

export const ProductDetail = ({ product }: ProductDetailsProps) => {
  const productPrice =
    product.discount.type === "percentage"
      ? Math.floor(
          Number(product.basePrice) -
            (Number(product.basePrice) *
              Number(product.discount.value)) /
              100,
        )
      : Math.max(
          Number(product.basePrice) - Number(product.discount.value),
          0,
        );

  const { title, slug, thumbnail } = product;

  const productDetails = {
    productPrice,
    title,
    slug,
    thumbnail,
  };

  const cleanHTML = product.description.replace(/<p>\s*<\/p>/g, "");
  const from = "productDetails";

  // Calculate discount percentage for badge
  const discountPercentage =
    product.discount.type === "percentage"
      ? product.discount.value
      : Math.round(
          (Number(product.discount.value) /
            Number(product.basePrice)) *
            100,
        );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery Section */}
          <div className="relative">
            {/* Discount Badge */}
            {Number(product.discount.value) > 0 && (
              <div className="absolute top-4 left-30 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
                <Tag className="w-4 h-4" />
                <span className="font-bold text-sm">
                  {discountPercentage}% OFF
                </span>
              </div>
            )}

            {/* Product Images */}
            <div className="max-w-full md:max-w-80 mx-auto w-full">
              <ProductImage
                thumbnail={product.thumbnail}
                gallery={product.gallery}
                title={product.title}
              />
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Easy Ship</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium">Trending</span>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Breadcrumb - Optional */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="hover:text-primary cursor-pointer transition-colors">
                Home
              </span>
              <span>/</span>
              <span className="hover:text-primary cursor-pointer transition-colors">
                Products
              </span>
              <span>/</span>
              <span className="text-gray-900 font-medium">
                {product.title}
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-2 border-primary/20">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ৳{productPrice.toLocaleString()}
                </span>
                {Number(product.discount.value) > 0 && (
                  <span className="text-2xl text-gray-400 line-through font-medium">
                    ৳{Number(product.basePrice).toLocaleString()}
                  </span>
                )}
              </div>
              {Number(product.discount.value) > 0 && (
                <p className="text-sm text-green-600 font-semibold mt-2">
                  You save ৳
                  {(
                    Number(product.basePrice) - productPrice
                  ).toLocaleString()}{" "}
                  ({discountPercentage}%)
                </p>
              )}
            </div>

            {/* Short Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 leading-relaxed text-base">
                {product.shortDescription}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Product Variants */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <ProductVariants
                variants={product.variants}
                product={product}
                from={from}
                productDetails={productDetails}
              />
            </div>

            {/* Trust Badges - Mobile */}
            <div className="grid grid-cols-3 gap-3 lg:hidden">
              <div className="flex flex-col items-center gap-2 text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-center">
                  Authentic
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-center">
                  Free Ship
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium text-center">
                  Trending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Tabs Header */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-primary text-primary font-semibold text-lg">
              Description
            </button>
          </div>
        </div>

        {/* Description Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12">
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900
              prose-headings:font-bold
              prose-h1:text-3xl
              prose-h1:mb-6
              prose-h1:mt-8
              prose-h2:text-2xl
              prose-h2:mb-4
              prose-h2:mt-6
              prose-h3:text-xl
              prose-h3:mb-3
              prose-h3:mt-4
              prose-p:text-gray-600
              prose-p:leading-relaxed
              prose-p:my-4
              prose-ul:my-4
              prose-li:text-gray-600
              prose-li:my-2
              prose-strong:text-gray-900
              prose-a:text-primary
              prose-a:no-underline
              hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
        </div>
      </div>

      {/* Video Section - Uncomment when needed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product Video
          </h2>
          <YouTubeVideoPlayer
            videoUrl={product.featureVideo}
          />
        </div>
      </div>
    </div>
  );
};
