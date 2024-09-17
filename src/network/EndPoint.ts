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
  ADDRESS:{
    ADD: "/address",
    LIST: "/address",
    GET: "/address/:addressId",
    UPDATE: "/address/:addressId",
    DELETE: "/address/:addressId",
  },
  CHECKOUT: {
    GETCLIENTSECRET: "/checkout",
  },
};
