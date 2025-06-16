// features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      console.log("Thêm sản phẩm:", action.payload);

      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );

      console.log("Đã có trong giỏ hàng chưa?", item);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (i) => i.productId === action.payload
      );
      if (index >= 0) {
        const item = state.items[index];
        state.total -= item.price * item.quantity;
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
