export const ENDPOINT = {
  PRODUCT: {
    GET: "/products/:productId",
    LIST: "/products",
  },
  CATEGORY: {
    LIST: "/categories",
    GET: "/categories/:categoryId",
  },
  ORDERS: {
    LIST: "/orders",
    GET: "/orders/:orderId",
  },
  PROFILE: {
    GET: "/profile",
    UPDATE: "/profile",
  },
  ADDRESS: "profile/address",
  CHECKOUT: {
    GETCLIENTSECRET: "/checkout",
  },
};
