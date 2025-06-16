import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/features/products/productSlice";
import cartReducer from "../redux/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
