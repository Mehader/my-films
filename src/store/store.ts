import { configureStore } from "@reduxjs/toolkit";
import { film } from "./filmSlice";
import { premierFilms } from "./premierSlice";
import { catalog } from "./catalogSlice";
import { users } from "./usersSlice";
import { search } from "./searchSlice";

export const store = configureStore({
  reducer: {
    film: film.reducer,
    premierFilms: premierFilms.reducer,
    catalogFilms: catalog.reducer,
    users: users.reducer,
    search: search.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
