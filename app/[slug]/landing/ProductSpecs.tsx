"use client";

import { motion } from "framer-motion";

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

interface ProductSpecsProps {
  product: Product;
}

const ProductSpecs = ({ product }: ProductSpecsProps) => {
  // Build specs dynamically from product data
  const specs = [
    { label: "SKU", value: product.sku },
    { label: "Category", value: product.category },
    ...(product.subCategory ? [{ label: "Sub Category", value: product.subCategory }] : []),
    { label: "Available Colors", value: [...new Set(product.variants.map((v) => v.attributes.color))].join(", ") },
    { label: "Available Sizes", value: [...new Set(product.variants.flatMap((v) => v.attributes.size.split(",")))].map(s => s.trim()).join(", ") },
    { label: "Total Stock", value: product.stockQuantity + " units" },
    { label: "Tags", value: product.tags.join(", ") },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
            Product <span className="text-gradient-gold">Details</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Specs Table */}
            <div className="space-y-0 border border-border rounded-xl overflow-hidden">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex justify-between items-center p-4 ${
                    index !== specs.length - 1 ? "border-b border-border" : ""
                  } hover:bg-secondary/50 transition-colors duration-300`}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-foreground text-right max-w-[60%]">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Variants Summary */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-semibold">Available Variants</h3>
              <div className="space-y-3">
                {product.variants.map((variant, index) => (
                  <motion.div
                    key={variant.sku}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-border bg-secondary/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-foreground">
                        {variant.attributes.color}
                      </span>
                      <span
                        className={`text-sm px-2 py-0.5 rounded-full ${
                          variant.stock > 10
                            ? "bg-green-100 text-green-700"
                            : variant.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock"}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sizes: {variant.attributes.size}
                    </div>
                    {variant.price && (
                      <div className="text-sm text-gold mt-1">
                        Special Price: ৳{parseFloat(variant.price).toLocaleString()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSpecs;
