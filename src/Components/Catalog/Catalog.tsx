import React, { useEffect, useRef } from "react";
import Card from "../Slider/Card/Card";
import styles from "./Catalog.module.scss";
import Pagination from "../UI/Pagination/Pagination";
import { endPoint, getFilms } from "../../api";
import { addCatalogFilms } from "../../store/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Loader from "../Loaders/Loader";
import { CatalogFilm, IFilmsState } from "../../types";

const Catalog: React.FC = () => {
  const {
    totalPages,
    pageActiveNum,
    items,
    isLoad,
    typeCatalog,
  }: IFilmsState<CatalogFilm> = useAppSelector((state) => state.catalogFilms);

  const titleCatalogRef = useRef<HTMLHeadingElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getFilms(
        typeCatalog,
        addCatalogFilms,
        pageActiveNum != undefined ? pageActiveNum.toString() : "",
        600
      )
    );
  }, [pageActiveNum, typeCatalog]);

  return (
    <div className="container">
      {!isLoad ? (
        <Loader />
      ) : (
        <h2 ref={titleCatalogRef} className={styles.title}>
          {typeCatalog === endPoint.pageFilm ? "Все фильмы" : "Все тв-шоу"}
        </h2>
      )}

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
      <Pagination
        titleCatalogRef={titleCatalogRef}
        totalPages={totalPages}
        pageActiveNum={pageActiveNum !== undefined ? pageActiveNum : 0}
      />
    </div>
  );
};

export default Catalog;
