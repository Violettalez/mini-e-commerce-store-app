import { createSlice } from "@reduxjs/toolkit";
const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    products: [],
  },
  reducers: {
    addProductFav: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProductFav: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});
export const getFavStatus = (productId) => (state) =>
  state.favourites.products.some((pr) => pr.id === productId);
export const { addProductFav, deleteProductFav } = favouritesSlice.actions;
export default favouritesSlice.reducer;
