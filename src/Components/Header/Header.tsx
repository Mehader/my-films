import React, { ChangeEvent, useEffect } from "react";
import styles from "./Header.module.scss";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Link } from "react-router-dom";
import BigLoader from "../Loaders/BigLoader/BigLoader";
import cn from "classnames";
import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useScrollTop,
} from "../../hooks";
import { endPoint, getFilms } from "../../api";
import { setTypeCatalog } from "../../store/catalogSlice";
import {
  addValueSearch,
  clearSearchFilms,
  searchFilms,
} from "../../store/searchSlice";

const Header: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.users);
  const { typeCatalog } = useAppSelector((state) => state.catalogFilms);
  const { searchValue } = useAppSelector((state) => state.search);

  const readyValue = useDebounce(searchValue, 300);
  const dispatch = useAppDispatch();

  if (searchValue === "") {
    dispatch(clearSearchFilms());
  }

  const clearSearchValue = () => {
    dispatch(addValueSearch(""));
  };

  useScrollTop();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addValueSearch(e.target.value));
  };

  useEffect(() => {
    if (readyValue) {
      dispatch(getFilms("", searchFilms, "", 0, endPoint.search + readyValue));
    }
  }, [readyValue]);

  return (
    <div className={styles.header}>
      <BigLoader />
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <span className={styles.logo_text__white}>My</span>
            <span className={styles.logo_text__red}>Films</span>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menu_item}>
              <Link onClick={clearSearchValue} to={"/"}>
                Главная
              </Link>
            </li>

            <li>
              <Link
                className={cn(
                  styles.menu_item,
                  typeCatalog === endPoint.pageFilm ? styles.active : ""
                )}
                onClick={() => {
                  dispatch(setTypeCatalog(endPoint.pageFilm));
                }}
                to={"/"}
              >
                Фильмы
              </Link>
            </li>

            <li>
              <Link
                className={cn(
                  styles.menu_item,
                  typeCatalog === endPoint.pageTvShow ? styles.active : ""
                )}
                onClick={() => {
                  dispatch(setTypeCatalog(endPoint.pageTvShow));
                }}
                to={"/"}
              >
                ТВ-шоу
              </Link>
            </li>
          </ul>
          <div className={styles.search}>
            <Input
              valid={true}
              value={searchValue}
              handler={handleSearch}
              type="search"
              placeholder="поиск..."
            />
          </div>
          <div className={styles.login}>
            <div className={styles.btn_log}>
              <Link to={"/account"}>
                <Button handler={clearSearchValue}>
                  {isLogin ? "аккаунт" : "вход"}
                </Button>
              </Link>
            </div>
            <div className={styles.btn_reg}>
              <Link to={"/registration"}>
                <Button handler={clearSearchValue}>регистрация</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
