import React, { useEffect, useState } from "react";
import styles from "./BigCard.module.scss";
import { useAppDispatch, useAppSelector, useScrollTop } from "../../hooks";
import { useLocation } from "react-router-dom";
import { Film } from "../../types";
import cn from "classnames";
import { addFilm } from "../../store/filmSlice";
import { getFilms } from "../../api";

const BigCard: React.FC = () => {
  const [animations, setAnimations] = useState(false);

  const film: Film = useAppSelector((state) => state.film.item);
  const { pathname } = useLocation();
  const idFilm = pathname.split(":")[1];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFilms(idFilm, addFilm));
    setAnimations(true);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.card_wrapper}>
        <div className={cn(styles.card_img, animations && styles.actionImg)}>
          <img src={film.posterUrlPreview} alt="Poster" />
        </div>
        <div
          className={cn(styles.card_descrBox, animations && styles.actionDescr)}
        >
          <h3 className={styles.card_title}>{film.nameRu}</h3>
          <table>
            <tbody>
              <tr>
                <td>Страна:</td>
                <td>{film.countries.map((el) => el.country).join(", ")}</td>
              </tr>
              <tr>
                <td>Жанр:</td>
                <td>{film.genres.map((el) => el.genre).join(", ")}</td>
              </tr>
              <tr>
                <td>Рейтинг:</td>
                <td>
                  {film.ratingKinopoisk ? film.ratingKinopoisk : "нет оценок"}
                </td>
              </tr>
              <tr>
                <td>Год:</td>
                <td>{film.year}</td>
              </tr>
              <tr>
                <td>Время:</td>
                <td>{film.filmLength} минут</td>
              </tr>
              <tr>
                <td>Описание:</td>
                <td>{film.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BigCard;
