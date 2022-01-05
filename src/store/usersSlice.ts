import { createSlice } from "@reduxjs/toolkit";
import { IUsers } from "../types";

const initialState: IUsers = {
  users: false,
  isLogin: false,
  favorites: [],
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
    },
    addUserLS: (state) => {
      state.isLogin = localStorage.getItem("account") ? true : false;
    },
    addFavorite: (state, action) => {
      state.favorites = action.payload;
    },
    delFavorite: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { addUser, addUserLS, addFavorite, delFavorite } = users.actions;
