import { createSlice } from "@reduxjs/toolkit";
const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});
export const { addProduct, deleteProduct } = favouritesSlice.actions;
export default favouritesSlice.reducer;
