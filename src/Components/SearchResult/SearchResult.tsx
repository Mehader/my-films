import React from "react";
import styles from "./SearchResult.module.scss";
import Card from "../Slider/Card/Card";
import { useAppSelector } from "../../hooks";
import Loader from "../Loaders/Loader";

const SearchResult: React.FC = () => {
  const { isLoad } = useAppSelector((state) => state.catalogFilms);
  const { items } = useAppSelector((state) => state.search);
  const { searchValue } = useAppSelector((state) => state.search);

  return (
    <div className="container">
      <div className={styles.search_box}>
        {isLoad ? (
          <h2 className={styles.title}>Результат поиска</h2>
        ) : (
          <Loader />
        )}
        {searchValue && items.length ? (
          <ul className={styles.wrapper}>
            {items.map((el) => (
              <li key={el.kinopoiskId}>
                <Card
                  id={el.kinopoiskId}
                  rating={el.ratingKinopoisk}
                  genre={el.genres.map((el) => el.genre).toString()}
                  img={el.posterUrlPreview}
                  title={el.nameRu}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.search_nothingBox}>
            <span>Ничего не найдено</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
