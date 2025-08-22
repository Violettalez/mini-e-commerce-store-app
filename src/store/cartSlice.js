import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    promoCodes: [
      { pC: "SALES777", discount: 10 },
      { pC: "VIOLETTA27", discount: 15 },
    ],
    discount: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existing = state.products.find((p) => p.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
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
      }
    },
    totalDeleteProduct: (state, action) => {
      const prod = state.products.find((pr) => pr.id === action.payload);
      if (prod) {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },
    cleanCart: (state) => {
      state.products = [];
      state.discount = 0;
    },
    addPromoCode: (state, action) => {
      const pCode = action.payload;
      const prom = state.promoCodes.find((promocode) => promocode.pC === pCode);
      state.discount = prom ? prom.discount : 0;
    },
  },
});
export const selectCartTotal = (state) =>
  state.cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

export const selectCartQuantity = (state) =>
  state.cart.products.reduce((total, p) => total + p.quantity, 0);

export const selectCartTotalWithDiscount = (state) => {
  const total = selectCartTotal(state);
  const discounted = total - (total / 100) * state.cart.discount;
  return discounted > 0 ? discounted : 0;
};

export const {
  addProduct,
  deleteProduct,
  cleanCart,
  totalDeleteProduct,
  addPromoCode,
} = cartSlice.actions;
export default cartSlice.reducer;
