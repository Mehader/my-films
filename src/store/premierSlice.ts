import { createSlice } from "@reduxjs/toolkit";
import { Film, IFilmsState } from "../types";

const initialState: IFilmsState<Film> = {
  items: [],
  sliderPos: 0,
};

export const premierFilms = createSlice({
  name: "premierFilms",
  initialState,
  reducers: {
    addPremierFilms: (state, action) => {
      state.items = action.payload.items;
    },
    setSliderPos: (state, action) => {
      state.sliderPos = action.payload;
    },
  },
});

export const { addPremierFilms, setSliderPos } = premierFilms.actions;
