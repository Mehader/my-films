import { createSlice } from "@reduxjs/toolkit";
import { IFilmState } from "../types";

const initialState: IFilmState = {
  item: {
    kinopoiskId: 0,
    nameRu: "",
    posterUrl: "",
    posterUrlPreview: "",
    ratingKinopoisk: 0,
    year: 0,
    filmLength: 0,
    description: "",
    countries: [],
    genres: [],
    duration: 0,
    premiereRu: "",
  },
  reviews: [],
};

export const film = createSlice({
  name: "film",
  initialState,
  reducers: {
    addFilm: (state, action) => {
      state.item = action.payload;
    },
    addReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { addFilm, addReviews } = film.actions;
