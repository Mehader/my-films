import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getReviews } from "../../api";
import { addReviews } from "../../store/filmSlice";
import { useLocation } from "react-router-dom";

const Reviews: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.users);
  const { reviews } = useAppSelector((state) => state.film);
  const { pathname } = useLocation();
  const idFilm = pathname.split(":")[1];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReviews(addReviews, idFilm));
  }, []);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Рецензии к фильму</h3>
        {isLogin ? (
          <ul>
            {!reviews.length ? (
              <div className={styles.reviews_error}>рецензии отсутствуют</div>
            ) : (
              reviews.map((el) => (
                <li className={styles.wrapper_reviews}>
                  <h3 className={styles.reviews_title}>{el.reviewTitle}</h3>
                  <div className={styles.box_author}>
                    <span className={styles.reviews_author}>
                      Автор: {el.reviewAutor}
                    </span>

                    {el.reviewType === "POSITIVE" ? (
                      <span className={styles.green}>Положительный</span>
                    ) : (
                      <span className={styles.red}>Отрицательный</span>
                    )}
                  </div>
                  <p className={styles.reviews_description}>
                    {el.reviewDescription}
                  </p>
                  <div className={styles.reviews_data}>
                    Дата: {el.reviewData}
                  </div>
                </li>
              ))
            )}
          </ul>
        ) : (
          <div className={styles.reviews_error}>
            рецензии могут просматривать только зарегестрированные пользователи
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
