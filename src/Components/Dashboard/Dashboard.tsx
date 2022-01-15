import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import Button from "../UI/Button/Button";
import { addFavorite, addUserLS } from "../../store/usersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Favorite from "../Faforite/Favorite";
import { getFavoriteLS, parseLS } from "../../functionLS";

const Dashboard: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.users);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const liveAccount = () => {
    localStorage.setItem("account", "");
    dispatch(addUserLS());
  };

  const myLogin = localStorage.getItem("account");
  const myPassword = " " + parseLS(myLogin ? myLogin : "").password;

  useEffect(() => {
    dispatch(addFavorite(getFavoriteLS()));
  }, []);

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <h2 className={styles.dashboard_title}>Аккаунт</h2>
        <div className={styles.dashboard_wrapper}>
          <div className={styles.personPanel}>
            <div className={styles.personData_box}>
              <div>Ваш логин: {myLogin}</div>
              <div>
                Ваш пароль:
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setShow(!show)}
                >
                  {show ? myPassword : " показать"}
                </span>
              </div>

              <div className={styles.btnExit}>
                <Button handler={liveAccount}>выйти из аккаунта</Button>
              </div>
            </div>
          </div>
          <div>
            <h3 className={styles.favourites_title}>Фильмы для просмотра</h3>
            <div className={styles.favourites}>
              <ul>
                {favorites &&
                  favorites.map((el) => (
                    <Favorite key={el.id} title={el.title} id={el.id} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
