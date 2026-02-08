"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductImageProps {
  thumbnail: any;
  gallery: string[];
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  thumbnail,
  gallery,
  title,
}) => {
  const images = [thumbnail, ...gallery]; // main + gallery
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleGalleryClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="max-w-7xl w-full flex flex-col items-center">
      <div className="w-full mx-auto">
        <div>
          {/* Main Image with Carousel & Zoom */}
          <div
            className="relative w-full h-120 lg:h-90 overflow-hidden rounded cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {/* Image */}
            <Image
              src={images[activeIndex]}
              alt={title}
              fill
              style={{
                objectFit: "cover",
                transform: isZoomed ? "scale(1.5)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
              className="rounded w-full"
            />

            {/* Carousel Arrows */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-opacity-60 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-opacity-60 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => handleGalleryClick(index)}
              className={`relative w-16 h-16 shrink-0 rounded overflow-hidden cursor-pointer border-2 ${
                index === activeIndex ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
