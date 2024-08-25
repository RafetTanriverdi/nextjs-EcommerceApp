import { configureStore } from "@reduxjs/toolkit";
import clientSecretReducer from "../data/redux/clientSecretSlice";
import cartReducer from "../data/redux/cartSlice";

export const store = configureStore({
  reducer: {
    clientSecret: clientSecretReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
