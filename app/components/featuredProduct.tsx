import { getFeaturedProduct } from "@/lib/products";
import ProductCarousel from "./productCarousel";

export const FeaturedProduct = async () => {
  const result = await getFeaturedProduct();

  if (!result.data || result.data.length === 0) {
    return (
      <div className="text-center min-h-[30vh]">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <p className="text-gray-600">No featured products available.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductCarousel products={result.data} />
    </div>
  );
};
