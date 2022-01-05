import React, { ChangeEvent, useState } from "react";
import styles from "./FormLogin.module.scss";
import { useAppDispatch } from "../../../hooks";
import { addUserLS } from "../../../store/usersSlice";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { parseLS } from "../../../functionLS";

const FormLogin: React.FC = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valid, setValid] = useState(true);

  const dispatch = useAppDispatch();

  const handlerTypeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
    setValid(true);
  };

  const handlerTypePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
    setValid(true);
  };

  const handlerBtnSubmit = (e: MouseEvent) => {
    e.preventDefault();
    if (parseLS(valueEmail).password == valuePassword) {
      const objAccount = {
        password: `${valuePassword}`,
        favorites: [...parseLS(valueEmail).favorites],
      };
      localStorage.setItem(`${valueEmail}`, JSON.stringify(objAccount));
      localStorage.setItem("account", `${valueEmail}`);
      dispatch(addUserLS());
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.form_box}>
          <h3 className={styles.form_title}>Аккаунт</h3>
          <Input
            type="text"
            placeholder="введите почту"
            value={valueEmail}
            handler={handlerTypeEmail}
            valid={valid}
          />
          <Input
            type="password"
            placeholder="введите пароль"
            value={valuePassword}
            handler={handlerTypePassword}
            valid={valid}
          />
          <Button handler={handlerBtnSubmit}>войти</Button>
          {!valid ? (
            <div className={styles.errorBox}>
              <h4>Ошибка ввода</h4>
              <div>Неверный логин или пароль</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
