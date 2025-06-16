// features/products/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../store/store";

export interface Product {
  _id: string;
  id?: string;
  image?: string;
  description?: string;
  name: string;
  category: string;
  price: number;
}

interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchAll",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/products`
    );

    const products = response.data.map((item) => ({
      ...item,
      _id: item._id ?? item.id, 
    }));

    return products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default productSlice.reducer;
export const selectProducts = (state: RootState) => state.products.items;
