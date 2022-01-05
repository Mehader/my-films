import axios from "axios";
import { AppDispatch } from "./store/store";
import { setIsLoad } from "./store/catalogSlice";
import { log } from "util";

export const URL_API = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
export const URL_API_REVIEWS =
  "https://kinopoiskapiunofficial.tech/api/v1/reviews?filmId=";
export const API_KEY = "3a682d82-f90b-4906-9524-1fffabb2565c";

export enum endPoint {
  premieres = "premieres?year=2022&month=JANUARY",
  pageFilm = "?type=FILM&page=",
  pageTvShow = "?type=TV_SHOW&page=",
  search = "?keyword=",
  trailers = "/videos",
}

const config = {
  headers: {
    "X-API-KEY": API_KEY,
    "Content-Type": "application/json",
  },
};

export const getFilms = (
  param: string = "",
  action: any,
  page: string = "",
  delay: number = 0,
  search: string = ""
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoad(false));
    const response = await axios.get(URL_API + param + page + search, config);
    setTimeout(() => {
      dispatch(action(response.data));
      dispatch(setIsLoad(true));
    }, delay);
  };
};

export const getReviews = (action: any, id: string, delay: number = 0) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        URL_API_REVIEWS + id + "&page=1",
        config
      );
      setTimeout(() => {
        dispatch(action(response.data.reviews));
        console.log(typeof response.data.reviews);
      }, delay);
    } catch (e) {
      setTimeout(() => {
        dispatch(action([]));
      }, delay);
    }
  };
};
