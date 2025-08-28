import { createSlice } from "@reduxjs/toolkit";
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrders: (state, action) => {
      let dateToday = Date.now();
      state.orders.push({
        ...action.payload,
        date: dateToday,
        status: "In processing",
      });
    },
    deleteOrders: (state, action) => {
      state.orders = state.orders.filter((order) => order.date !== action.payload);
    },
  },
});
export const { addOrders, deleteOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
