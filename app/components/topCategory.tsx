"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SubCategory {
  name: string;
  slug: string;
  isActive: boolean;
  id: string;
}

interface Category {
  isActive: boolean;
  name: string;
  order: number;
  slug: string;
  image?: string;
  subCategories: SubCategory[];
  _id: string;
}

// Get a list of some Lucide icons
const iconList = [
  LucideIcons.Box,
  LucideIcons.Cpu,
  LucideIcons.Heart,
  LucideIcons.Watch,
  //   LucideIcons.Shoe,
  LucideIcons.Thermometer,
  LucideIcons.ShoppingBag,
  LucideIcons.Gift,
];

interface TopCategoriesProps {
  categories: Category[];
}

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      {!categories || categories.length === 0 ? (
        <div className="text-2xl text-center text-primary">
          No Category found
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-xl lg:text-4xl font-bold pl-4 text-center uppercase font-semibold mb-5">Top Categories</h2>
          </div>
          <div className="flex flex-wrap flex-row items-center justify-start lg:justify-center gap-4">
            {categories
              .slice(0, 5)
              .sort((a, b) => a.order - b.order)
              .map((cat, index) => {
                // Pick a random icon for each category (based on index to keep consistent)
                const IconComponent =
                  iconList[index % iconList.length];

                return (
                  <Link
                    href={`/shop/${cat._id}`}
                    key={cat._id}
                    className={`h-full rounded-full`}
                  >
                    <div
                      key={cat._id}
                      className="flex flex-col items-center justify-center bg-white rounded-full shadow hover:shadow-xl transition cursor-pointer text-center relative group overflow-hidden w-24 h-24 lg:w-48 lg:h-48 "
                    >
                      {/* Icon */}
                      {cat.image ? (
                        <div className="w-full">
                          <Image
                            src={cat?.image}
                            alt={cat.name}
                            priority
                            width={300}
                            height={300}
                            className="w-[150px] lg:w-[300px] lg:h-[200px] object-cover group-hover:scale-[110%] duration-300"
                          />
                        </div>
                      ) : (
                        <div className="bg-[#ebdfd4] rounded-full p-3 mb-2">
                          <IconComponent
                            size={28}
                            className="text-primary"
                          />
                        </div>
                      )}

                      {/* Name */}
                      <span className="text-sm font-medium text-white bg-primary shadow rounded-full p-2 uppercase absolute bottom-0 left-0 right-0">
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
};
