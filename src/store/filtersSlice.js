import { createSlice } from "@reduxjs/toolkit";

const filtersSlise = createSlice({
  name: "filters",
  initialState: {
    searchString: "",
    sorting: "none",
    category: [],
    brand: [],
    startPrice: 0,
    endPrice: 0,
  },
  reducers: {
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setStartPrice: (state, action) => {
      state.startPrice = action.payload;
    },
    setEndPrice: (state, action) => {
      state.endPrice = action.payload;
    },
    addCategory: (state, action) => {
      if (!state.category.includes(action.payload)) {
        state.category.push(action.payload);
      }
    },
    removeCategory: (state, action) => {
      state.category = state.category.filter((c) => c !== action.payload);
    },
    addBrand: (state, action) => {
      if (!state.brand.includes(action.payload)) {
        state.brand.push(action.payload);
      }
    },
    removeBrand: (state, action) => {
      state.brand = state.brand.filter((b) => b !== action.payload);
    },
    clearFilters: (state) => {
      state.searchString = "";
      state.sorting = "none";
      state.category = [];
      state.brand = [];
      state.startPrice = 0;
      state.endPrice = 0;
    },
  },
});
export const {
  setSearchString,
  setSorting,
  setStartPrice,
  setEndPrice,
  addCategory,
  removeCategory,
  addBrand,
  removeBrand,
  clearFilters,
} = filtersSlise.actions;
export default filtersSlise.reducer;
