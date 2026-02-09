"use client";

import { useState } from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ProductFormData } from "@/utils/product";
import ProductVariant from "./ProductVariants";
import { createPortal } from "react-dom";
import { handleWhatsApp } from "./handleWhatsApp";

interface Product {
  product: ProductFormData;
}

export const CardButtons = ({ product }: Product) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);

  const from = "cardButton";

  const handleAddToCart = () => {
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  const productPrice =
    product.discount.type === "percentage"
      ? Math.floor(
          Number(product.basePrice) -
            (Number(product.basePrice) * Number(product.discount.value)) / 100,
        )
      : Math.max(Number(product.basePrice) - Number(product.discount.value), 0);

  const { title, slug, thumbnail } = product;

  const productDetails = {
    productPrice,
    title,
    slug,
    thumbnail,
  };

  const handleBuyNow = () => {
    setIsCartModalOpen(true);
    setIsBuyNow(true);
  };

  return (
    <>
      <div className="space-y-3 hidden md:block">
        <button
          onClick={handleBuyNow}
          className="w-full bg-linear-to-t from-primary to-primary-foreground hover:from-primary-foreground hover:to-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 transition"
        >
          <ShoppingBag /> BUY NOW
        </button>

        <button
          onClick={() => handleWhatsApp()}
          className="w-full bg-linear-to-t from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center text-xs   md:text-sm gap-2 transition"
        >
          <FaWhatsapp />
          ORDER VIA WHATSAPP
        </button>

        <button
          onClick={handleAddToCart}
          className="w-full border border-primary py-2 rounded-lg font-semibold flex items-center justify-center gap-2  hover:bg-primary text-base hover:text-white transition hover:cursor-pointer"
        >
          <ShoppingCart /> ADD TO CART
        </button>
      </div>
      <div className="space-y-3 md:hidden">
        <div className=" flex gap-2">
          <button
            onClick={handleBuyNow}
            className="w-full bg-linear-to-t from-primary to-primary-foreground hover:from-primary-foreground hover:to-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 transition"
          >
            <ShoppingBag />
          </button>

          <button className="w-full bg-linear-to-t from-[#073d19] to-[#09b442] hover:from-[#09b442] hover:to-[#073d19] text-white py-3 rounded-lg font-semibold flex items-center justify-center text-xs   md:text-sm gap-2 transition">
            <FaWhatsapp size={28} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full border border-primary text-primary-foreground py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition"
        >
          <ShoppingCart />
        </button>
      </div>
      {/* Modal */}

      {isCartModalOpen &&
        createPortal(
          // <AddToCartModal product={product} onClose={closeModal} />

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-2">
                Product added to cart
              </h2>

              <p className="text-sm text-gray-600 mb-4">{product.title}</p>
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
    </>
  );
};
