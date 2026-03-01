import { getDeletedProduct } from "@/lib/products";
import React from "react";
import DeletedProductsTable from "../components/DeletedProductTable";

const DeletedProducts = async () => {
  const res = await getDeletedProduct();

  const result = res.data;

  return (
    <div>
      <DeletedProductsTable
        initialProducts={res.success ? result : []}
      />
    </div>
  );
};

export default DeletedProducts;
