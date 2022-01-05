import React, { useEffect } from "react";
import Slider from "../Slider/Slider";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Catalog from "../Catalog/Catalog";
import { endPoint, getFilms } from "../../api";
import { addPremierFilms } from "../../store/premierSlice";
import { Film, IFilmsState } from "../../types";
import { addFavorite } from "../../store/usersSlice";
import { getFavoriteLS } from "../../functionLS";

const HomePage: React.FC = () => {
  const { items, sliderPos }: IFilmsState<Film> = useAppSelector(
    (state) => state.premierFilms
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFilms(endPoint.premieres, addPremierFilms));
    dispatch(addFavorite(getFavoriteLS()));
  }, []);

  return (
    <>
      <Slider
        title="новинки"
        items={items}
        sliderPos={sliderPos ? sliderPos : 0}
        dispatch={dispatch}
      />
      <Catalog />
    </>
  );
};

export default HomePage;
