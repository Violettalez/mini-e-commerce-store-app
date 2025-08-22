import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    sum: 0,
    totalQ: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existing = state.products.find((p) => p.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.sum += Number(action.payload.price);
      state.totalQ += 1;
    },
    deleteProduct: (state, action) => {
      const prod = state.products.find((pr) => pr.id === action.payload);
      if (prod) {
        if (prod.quantity > 1) prod.quantity -= 1;
        else {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
        state.sum -= Number(prod.price);
        state.totalQ -= 1;
      }
    },
    totalDeleteProduct: (state, action) => {
      const prod = state.products.find((pr) => pr.id === action.payload);
      if (prod) {
        state.sum -= Number(prod.price) * prod.quantity;
        state.totalQ -= prod.quantity;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.sum = 0;
      state.totalQ = 0;
    },
  },
});

export const { addProduct, deleteProduct, clearCart, totalDeleteProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
