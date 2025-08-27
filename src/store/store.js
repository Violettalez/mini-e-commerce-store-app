import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice"
export const store = configureStore({
  reducer: {
    cart:cartReducer,
    favourites: favouritesReducer,
  },
});
