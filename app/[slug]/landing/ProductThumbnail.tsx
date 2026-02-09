"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { addToCart, clearCart } from "@/utils/cartStorage";
import { fbEvent } from "@/utils/fbPixel";
import { useRouter } from "next/navigation";

export interface ProductVariant {
  attributes: {
    color: string;
    size: string;
  };
  sku: string;
  stock: number;
  price?: string;
}

export interface ProductDiscount {
  type: "percentage" | "fixed";
  value: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  discount: ProductDiscount;
  sku: string;
  stockQuantity: string;
  stockStatus: "in-stock" | "out-of-stock" | "low-stock";
  categoryId?: string;
  subCategoryId?: string | null;
  category: string;
  subCategory?: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  variants: ProductVariant[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  purchase?: string;
}

interface ProductHeroProps {
  product: Product;
}

const ProductHero = ({ product }: ProductHeroProps) => {
  const [selectedImage, setSelectedImage] = useState(
    product.thumbnail,
  );
  const [selectedVariant, setSelectedVariant] = useState(0);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const allImages = [product.thumbnail, ...product.gallery];

  // Calculate discounted price
  const basePrice = parseFloat(product.basePrice);
  const discountValue = parseFloat(product.discount.value);
  const discountedPrice =
    product.discount.type === "percentage"
      ? basePrice - (basePrice * discountValue) / 100
      : basePrice - discountValue;

  // Get unique colors from variants
  const colors = [
    ...new Set(product.variants.map((v) => v.attributes.color)),
  ];

  // Get sizes for selected color
  const selectedColor =
    product.variants[selectedVariant]?.attributes.color;
  const sizesForColor = product.variants
    .filter((v) => v.attributes.color === selectedColor)
    .map((v) => v.attributes.size);

  const isInStock = product.stockStatus === "in-stock";

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Select a size first.");
      return;
    }

    clearCart();

    const orderData = {
      selectedProductSize: selectedSize,
      quantity,
      selectedColor: {
        name: selectedColor,
      },
      selectedVariant: product.variants[selectedVariant],
      sku: product.sku,
      productPrice: Number(product.purchase),
      slug: product.slug,
      title: product.title,
      thumbnail: product.thumbnail,
    };

    addToCart(orderData);

    fbEvent("InitiateCheckout", {
      content_ids: [orderData.sku || orderData.slug],
      content_type: "product",
      content_name: orderData.title,
      value: orderData.productPrice,
      currency: "BDT",
    });

    router.push("/checkout");
  };

  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:sticky lg:top-24"
          >
            {/* Main Image */}
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-elevated bg-secondary"
              >
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Discount Badge */}
              {parseFloat(product.discount.value) > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-white text-sm font-semibold rounded-full">
                  -{product.discount.value}%
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 mt-6 justify-center flex-wrap">
              {allImages.slice(0, 5).map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === img
                      ? "border-gold shadow-gold"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            {/* Category & Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-gold/10 text-gold rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-secondary text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4 text-foreground">
              {product.title}
            </h1>

            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
              {product.shortDescription}
            </p>

            {/* Price Section */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-4xl font-semibold text-gold">
                ৳{discountedPrice.toLocaleString()}
              </span>
              {parseFloat(product.discount.value) > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ৳{basePrice.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium bg-gold/20 text-gold rounded-full">
                    {product.discount.value}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                  Select Color:{" "}
                  <span className="text-foreground font-medium">
                    {selectedColor}
                  </span>
                </p>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color, index) => {
                    const variantIndex = product.variants.findIndex(
                      (v) => v.attributes.color === color,
                    );
                    const isSelected =
                      selectedVariant === variantIndex;
                    return (
                      <button
                        key={color}
                        onClick={() =>
                          setSelectedVariant(variantIndex)
                        }
                        className={`px-4 py-2 rounded-lg border-1 text-sm font-medium transition-all ${
                          isSelected
                            ? "border-primary bg-gold/10 text-gold"
                            : "border-border hover:border-gold/50 text-muted-foreground"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizesForColor.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                  Available Sizes
                </p>
                <div className="flex gap-2 flex-wrap">
                  {sizesForColor[0].split(",").map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size.trim())}
                      className={`px-4 py-2 rounded-lg border cursor-pointer ${selectedSize === size ? "border-primary" : "border-border"} text-sm text-foreground`}
                    >
                      {size.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="inline-flex items-center border rounded-lg border-gray-400 bg-blue-50 mt-1">
              <button
                onClick={handleDecrease}
                className="px-4 py-2 text-xl font-bold hover:bg-gray-100 rounded-l-lg"
              >
                <Minus />
              </button>

              <span className="px-6 py-2 border-x border-primary bg-white font-semibold">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="px-4 py-2 text-xl font-bold hover:bg-gray-100 rounded-r-lg"
              >
                <Plus />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isInStock}
                className="flex bg-primary text-white items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed p-3 px-7 w-full mt-5"
                onClick={handleBuyNow}
              >
                Buy Now
              </motion.button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {isInStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">In Stock</span>
                  <span className="text-muted-foreground">
                    ({product.stockQuantity} available)
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-destructive">
                    Out of Stock
                  </span>
                </>
              )}
            </div>

            {/* Full Description */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-display text-xl font-semibold mb-4">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
