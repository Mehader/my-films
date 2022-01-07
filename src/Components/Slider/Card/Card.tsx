import React from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { ICard } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addFavoriteLS, getFavoriteLS } from "../../../functionLS";
import { addFavorite } from "../../../store/usersSlice";
import { addValueSearch } from "../../../store/searchSlice";

const Card: React.FC<ICard> = ({ title, img, genre, rating, id }) => {
  const { favorites, isLogin } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const checkFavorites = () => {
    if (favorites) {
      return favorites.find((el) => el.id === id) !== undefined;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.card}>
      {rating ? <div className={styles.card_rating}>{rating}</div> : ""}
      <div className={styles.img_box}>
        <div className={styles.bg_add}>
          <Link
            onClick={() => dispatch(addValueSearch(""))}
            className={styles.bg_add_link}
            to={`/film:${id}`}
          >
            <div>Смотреть</div>
          </Link>
          {isLogin && (
            <div>
              {!checkFavorites() ? (
                <div
                  onClick={() => {
                    addFavoriteLS(id, title);
                    dispatch(addFavorite(getFavoriteLS()));
                  }}
                  className={styles.bg_add_link}
                >
                  Добавить в избранное
                </div>
              ) : (
                <Link to={`/account`}>
                  <div className={styles.bg_add_link}>В избранном</div>
                </Link>
              )}
            </div>
          )}
        </div>

        <img className={styles.card_img} src={img} alt="Poster" />
      </div>

      <div className={styles.card_title}>{title}</div>
      <div className={styles.card_genre}>{genre}</div>
    </div>
  );
};

export default Card;
