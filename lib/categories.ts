import { CategoryFormData } from "@/app/admin/category/add-category/page";

// lib/getCategories.ts
export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-category`,
    {
      cache: "no-store"
    }
  );

  return res.json();
}

export async function getMarquee() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/marquee/get-marquee`,{
      cache: "no-store"
    }
  );
  return response.json();
}

export async function addCategories(data: CategoryFormData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}
