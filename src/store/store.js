import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice";
import filtersReducer from "./filtersSlice";
import ordersReducer from "./ordersSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
    filters: filtersReducer,
    orders: ordersReducer,
  },
});
