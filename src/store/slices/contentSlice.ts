import { createSlice, type PayloadAction,createAction  } from "@reduxjs/toolkit";
import type { ContentItem } from "../../types";
// 🔸 This is the custom action you define separately

interface ContentState {
  items: ContentItem[];
  filters: number[]; // Paid, Free, View Only
  search: string;
  sort: string;
  maxPrice: number | null;
  minPrice: number | null;
}

const initialState: ContentState = {
  items: [],
  filters: [],
  search: "",
  sort: "",
  maxPrice: null,
  minPrice: 0
};

export const resetAll = createAction("content/resetAll");
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ContentItem[]>) {
      state.items = action.payload;
    },
    toggleFilter(state, action: PayloadAction<number>) {
      const index = state.filters.indexOf(action.payload);
      if (index > -1) {
        state.filters.splice(index, 1);
      } else {
        state.filters.push(action.payload);
      }

    },
    resetFilters(state) {
      state.filters = [];
      state.sort = "";
      state.maxPrice = 500;  
      state.minPrice = 0;    
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilters(state, action: PayloadAction<number[]>) {
      state.filters = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | null>) {
      state.maxPrice = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number | null>) {
      state.minPrice = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);
  }
});


export const {
  setItems,
  toggleFilter,
  resetFilters,
  setSearch,
  setFilters,
  setSort,
  setMaxPrice,
  setMinPrice,
} = contentSlice.actions;

export default contentSlice.reducer;
