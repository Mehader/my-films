import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { addFavorite, addUserLS } from "../../store/usersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Favorite from "../Faforite/Favorite";
import { getFavoriteLS } from "../../functionLS";

const Dashboard: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.users);
  const [valueInput, setValueInput] = useState("");
  const dispatch = useAppDispatch();

  const liveAccount = () => {
    localStorage.setItem("account", "");
    dispatch(addUserLS());
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  useEffect(() => {
    dispatch(addFavorite(getFavoriteLS()));
  }, []);

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <h2 className={styles.dashboard_title}>Аккаунт</h2>
        <div className={styles.dashboard_wrapper}>
          <div className={styles.personPanel}>
            <div>
              <div className={styles.personPanel_itemBox}>
                <Input
                  valid={true}
                  value={valueInput}
                  handler={handleInput}
                  type="text"
                  placeholder="новая почта"
                />
                <Button>изменить</Button>
              </div>
              <div className={styles.personPanel_itemBox}>
                <Input
                  valid={true}
                  value={valueInput}
                  handler={handleInput}
                  type="password"
                  placeholder="новый пароль"
                />
                <Button>изменить</Button>
                <div className={styles.btnLiveBox}>
                  <Button handler={liveAccount}>выйти из аккаунта</Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.favourites}>
            <h3 className={styles.favourites_title}>Фильмы для просмотра</h3>
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
  );
};

export default Dashboard;
