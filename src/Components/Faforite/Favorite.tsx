import React from "react";
import styles from "./Favorite.module.scss";
import { IFavorite } from "../../types";
import { Link } from "react-router-dom";
import { delFavorite } from "../../store/usersSlice";
import { delFavoriteLS } from "../../functionLS";
import { useAppDispatch } from "../../hooks";

const Favorite: React.FC<IFavorite> = ({ title, id }) => {
  const dispatch = useAppDispatch();

  return (
    <li className={styles.favourites_item}>
      <Link to={`/film:${id}`}>
        <span>{title}</span>
      </Link>

      <div className={styles.favourites_btnBox}>
        <span onClick={() => dispatch(delFavorite(delFavoriteLS(id)))}>
          удалить
        </span>
      </div>
    </li>
  );
};

export default Favorite;
