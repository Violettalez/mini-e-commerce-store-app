import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice";
import filtersReducer from "./filtersSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
    filters: filtersReducer,
  },
});
