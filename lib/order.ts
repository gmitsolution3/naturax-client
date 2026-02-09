export const getAllOrder = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/all-product`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getOrderForUser = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order/all-product/${email}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getOrderById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/get-Order/${id}`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getHistory = async (phone: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/get-history/${phone}`,
    {
      cache: "no-cache",
    },
  );
  return res.json();
};

export const MainDashboardAnalytics = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "API Base URL is not defined in environment variables",
    );
  }
  const res = await fetch(
    `${baseUrl}/create-order/dashboard-analytics`,
    {
      cache: "no-cache",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch failed:", text);
    return { data: null };
  }

  return res.json();
};
