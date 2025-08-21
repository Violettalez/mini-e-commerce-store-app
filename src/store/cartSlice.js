import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    sum: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existing = state.products.find((p) => p.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.sum += parseFloat(action.payload.price.toFixed(2));
      state.sum = parseFloat(state.sum.toFixed(2));
    },
    deleteProduct: (state, action) => {
      const prod = state.products.find((pr) => pr.id === action.payload);
      if (prod) {
        if (prod.quantity > 1) prod.quantity -= 1;
        else {
          state.products = state.products.filter(
            (product) => product.id !== action.payload //action -> id product
          );
        }
        state.sum -= parseFloat(prod.price.toFixed(2));
        state.sum = parseFloat(state.sum.toFixed(2));
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.sum = 0;
    },
  },
});
export const { addProduct, deleteProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
