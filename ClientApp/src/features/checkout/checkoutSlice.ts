import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Product {
  id?: string;
  name?: string | null;
  price?: number;
  quantity?: number;
}

export interface CheckoutState {
  products: Product[];
  status: "idle" | "loading" | "failed";
}

const initialState: CheckoutState = {
  products: [],
  status: "idle",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload.id
      );
      if (!existingProduct) {
        state.products.push(action.payload);
      }
    },
  },
});

export const { addToCart } = checkoutSlice.actions;

export const selectProducts = (state: RootState) => state.checkout.products;

export default checkoutSlice.reducer;
