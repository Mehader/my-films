import React, { ChangeEvent, MouseEventHandler, RefObject } from "react";
import { AppDispatch } from "./store/store";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IFilmsState<T> {
  items: Array<T>;
  isLoad?: boolean;
  total?: number;
  totalPages?: number;
  pageActiveNum?: number;
  typeCatalog?: string;
  sliderPos?: number;
}

export interface IFilmState {
  item: Film;
  reviews: Array<Review>;
}

type Review = {
  reviewId: number;
  reviewType: string;
  reviewData: string;
  userPositiveRating: number;
  userNegativeRating: number;
  reviewAutor: string;
  reviewTitle: string;
  reviewDescription: string;
};

export interface ISlider {
  title: string;
  items: Array<Film>;
  sliderPos: number;
  dispatch: AppDispatch;
}

export interface IPagination {
  totalPages: number | undefined;
  pageActiveNum: number;
  titleCatalogRef: RefObject<HTMLHeadingElement>;
}

export interface IUsers {
  users: boolean;
  isLogin: boolean;
  favorites: Array<Favorite>;
}

export interface IInput {
  type: string;
  placeholder: string;
  value: string;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
  valid: boolean;
}

export interface IBtn {
  children: React.ReactNode;
  isActive?: boolean;
  handler?: (e: any) => void;
}

export interface ICard {
  title: string;
  img: string;
  genre: string;
  rating: number;
  id: number;
}

export interface IFavorite {
  id: number;
  title: string;
}

export interface ISearch {
  items: Array<Film>;
  searchValue: string;
}

type Favorite = {
  id: number;
  title: string;
};

export type CatalogFilm = {
  kinopoiskId: number;
  nameRu: string;
  genres: Array<Genre>;
  ratingKinopoisk: number;
  posterUrl: string;
  posterUrlPreview: string;
};

export type Film = {
  kinopoiskId: number;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingKinopoisk: number;
  year: number;
  filmLength: number;
  description: string;
  duration: 0;
  premiereRu: "";
  countries: Array<Countries>;
  genres: Array<Genre>;
};

type Countries = {
  country: string;
};

type Genre = {
  genre: string;
};
