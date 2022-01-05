import { createSlice } from "@reduxjs/toolkit";
import { ISearch } from "../types";

const initialState: ISearch = {
  items: [],
  searchValue: "",
};

export const search = createSlice({
  name: "searchFilms",
  initialState,
  reducers: {
    searchFilms: (state, action) => {
      state.items = action.payload.items;
    },
    addValueSearch: (state, action) => {
      state.searchValue = action.payload;
    },
    clearSearchFilms: (state) => {
      state.items.length = 0;
    },
  },
});

export const { searchFilms, addValueSearch, clearSearchFilms } = search.actions;
