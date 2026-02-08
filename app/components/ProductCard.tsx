"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { handleWhatsApp } from "./../(public)/shop/components/handleWhatsApp";
import { createPortal } from "react-dom";
import ProductVariant from "./../(public)/shop/components/ProductVariants";
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }: { product: any }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  const from = "cardButton";

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

  const calculatePrice = () => {
    const base = parseInt(product.basePrice);
    if (product.discount.type === "flat") {
      return base - parseInt(product.discount.value);
    } else if (product.discount.type === "percentage") {
      return base - (base * parseInt(product.discount.value)) / 100;
    }
    return base;
  };

  const getDiscountLabel = () => {
    if (product.discount.type === "flat") {
      return `-৳${product.discount.value}`;
    } else if (product.discount.type === "percentage") {
      return `-${product.discount.value}%`;
    }
    return "";
  };

  const discountedPrice = calculatePrice();
  const hasDiscount = parseInt(product.discount.value) > 0;

  const handleAddToCart = () => {
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  const handleBuyNow = () => {
    setIsCartModalOpen(true);
    setIsBuyNow(true);
  };

  const handleViewDetail = () => {
    router.push(`/shop/${product.categoryId}/${product.slug}`);
  };

  return (
    <div className="group/product bg-white overflow-hidden hover:shadow-xl transition-all duration-300 relative border border-gray-200">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-white">
        {/* Badges Container - Top Left */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1">
              {getDiscountLabel()}
            </span>
          )}
          {product.stockQuantity <= 10 && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-1">
              {product.stockQuantity} left
            </span>
          )}
        </div>

        {/* Wishlist Button - Top Right */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 transition-all duration-300 ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-700 hover:bg-white"
            }`}
            title="Add to Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative cursor-pointer" onClick={handleViewDetail}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover/product:scale-105"
          />
          
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover/product:bg-black/10 transition-all duration-300" />
        </div>

        {/* Horizontal Action Bar - Slides up from bottom */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover/product:translate-y-0 transition-transform duration-300 bg-white border-t border-gray-200">
          <div className="flex divide-x divide-gray-200">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-gray-900 hover:bg-primary hover:text-white transition-colors"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleViewDetail}
              className="flex items-center justify-center px-4 py-3 text-gray-900 hover:bg-primary hover:text-white transition-colors"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="flex items-center justify-center px-4 py-3 text-gray-900 hover:bg-green-500 hover:text-white transition-colors"
              title="WhatsApp"
            >
              <FaWhatsapp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {product.category}
        </div>

        {/* Title */}
        <h3 
          onClick={handleViewDetail}
          className="text-gray-900 font-medium text-base mb-3 line-clamp-2 leading-snug min-h-[3rem] hover:text-primary transition-colors cursor-pointer"
        >
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ৳{discountedPrice}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ৳{product.basePrice}
              </span>
              <span className="text-xs font-semibold text-green-600">
                Save ৳{parseInt(product.basePrice) - discountedPrice}
              </span>
            </>
          )}
        </div>

        {/* Order Now Button - Always Visible */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-gray-900 text-white py-2.5 text-sm font-semibold hover:bg-primary transition-colors duration-300"
        >
          Order Now
        </button>
      </div>

      {isCartModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl leading-none"
              >
                ×
              </button>

              <h2 className="text-lg font-semibold mb-2">
                Product added to cart
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {product.title}
              </p>
              <div>
                <ProductVariant
                  variants={product.variants}
                  from={from}
                  productDetails={productDetails}
                  onCloseModal={closeModal}
                  isBuyNow={isBuyNow}
                  product={product}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ProductCard;