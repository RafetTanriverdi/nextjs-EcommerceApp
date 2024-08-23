import { configureStore } from "@reduxjs/toolkit";
import clientSecretReducer from "../data/redux/clientSecretSlice";

export const store = configureStore({
  reducer: {
    clientSecret: clientSecretReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
