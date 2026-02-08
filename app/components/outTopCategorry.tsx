import { getCategories } from "@/lib/categories";
import React from "react";
import { TopCategories } from "./topCategory";

export const OurTopCategory = async () => {
  const res = await getCategories();

  return (
    <div className="max-w-7xl mx-auto min-h-[30vh]">
      <TopCategories categories={res.data}/>
    </div>
  );
};
