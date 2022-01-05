import { createSlice } from "@reduxjs/toolkit";
import { Film, IFilmsState } from "../types";
import { endPoint } from "../api";

const initialState: IFilmsState<Film> = {
  items: [],
  totalPages: 0,
  pageActiveNum: 1,
  isLoad: false,
  typeCatalog: endPoint.pageFilm,
};

export const catalog = createSlice({
  name: "catalogFilms",
  initialState,
  reducers: {
    addCatalogFilms: (state, action) => {
      state.items = action.payload.items;
      state.totalPages = action.payload.total;
    },
    setActivePage: (state, action) => {
      state.pageActiveNum = action.payload;
    },
    setIsLoad: (state, action) => {
      state.isLoad = action.payload;
    },
    setTypeCatalog: (state, action) => {
      state.typeCatalog = action.payload;
    },
  },
});

export const { addCatalogFilms, setActivePage, setIsLoad, setTypeCatalog } =
  catalog.actions;
