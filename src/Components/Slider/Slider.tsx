import React, { useRef, useState } from "react";
import styles from "./Slider.module.scss";
import Card from "./Card/Card";
import cn from "classnames";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { ISlider } from "../../types";
import { setSliderPos } from "../../store/premierSlice";

const Slider: React.FC<ISlider> = ({ items, title, sliderPos, dispatch }) => {
  const fullWidthSlier = items.length * 260 - 5 * 260;

  return (
    <div className={styles.slider}>
      <div className="container">
        <div style={{ overflow: "hidden" }}>
          <h2 className={styles.slider_title}>{title}</h2>
          <div className={styles.slider_arrowBox}>
            <HiOutlineArrowNarrowLeft
              onClick={() =>
                sliderPos != 0 ? dispatch(setSliderPos(sliderPos + 260)) : ""
              }
              className={cn(styles.slider_arrow, styles.slider_arrow__left)}
            />
            <HiOutlineArrowNarrowRight
              onClick={() =>
                sliderPos > -fullWidthSlier
                  ? dispatch(setSliderPos(sliderPos - 260))
                  : ""
              }
              className={cn(styles.slider_arrow, styles.slider_arrow__right)}
            />
          </div>
          <ul
            style={{ transform: `translate(${sliderPos}px)` }}
            className={styles.slider_mask}
          >
            {items.map((el) => (
              <li key={el.kinopoiskId}>
                <Card
                  id={el.kinopoiskId}
                  rating={0}
                  title={el.nameRu}
                  img={el.posterUrl}
                  genre={el.genres.map((el) => el.genre).toString()}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Slider;
