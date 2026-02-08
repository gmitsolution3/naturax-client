"use client";

import { ProductFormData } from "@/utils/product";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ProductCarousel = ({
  products,
  topSelling,
}: {
  products: ProductFormData[];
  topSelling?: string;
}) => {
  if (!products || products.length === 0) return null;

  const minSlidesForLoop = 5; // You can adjust this number
  const shouldLoop = products.length >= minSlidesForLoop;

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {topSelling ? (
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-2 uppercase">
              Top Selling Products
            </h2>
            <p className="text-gray-600 text-center">
              Check out our latest top selling products and
              bestsellers.
            </p>
          </div>
        ) : (
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-2 uppercase">
              Featured Products
            </h2>
            <p className="text-gray-600 text-center">
              Check out our latest products and bestsellers.
            </p>
          </div>
        )}

        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={shouldLoop}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            navigation={{
              nextEl: "#custom-next",
              prevEl: "#custom-prev",
              disabledClass: "opacity-30 cursor-not-allowed",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="h-full pb-8 pt-2">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            id="custom-prev"
            className="custom-prev absolute left-0 lg:-left-10 top-1/2 z-10 -translate-y-1/2 -translate-x-4 transform rounded-full bg-white hover:bg-gray-50 p-3 shadow-lg transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            id="custom-next"
            className="custom-next absolute right-0 lg:-right-10 top-1/2 z-10 -translate-y-1/2 translate-x-4 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
            aria-label="Next slide"
          >
            <svg
              className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;