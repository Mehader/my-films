import React, { ChangeEvent, useState } from "react";
import styles from "./Form.module.scss";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addUser, addUserLS } from "../../store/usersSlice";

const Form: React.FC = () => {
  const [valueEmail, setValueEmail] = useState({ text: "", valid: true });
  const [valuePassword, setValuePassword] = useState({ text: "", valid: true });
  const [account, setAccount] = useState(false);
  const { users } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const handlerTypeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail({ text: e.target.value, valid: true });
    setAccount(false);
    dispatch(addUser(false));
  };

  const handlerTypePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword({ text: e.target.value, valid: true });
    setAccount(false);
    dispatch(addUser(false));
  };

  const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
    valueEmail.text
  );
  const regPassword =
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/.test(
      valuePassword.text
    );

  const checkLS = (): boolean => {
    if (localStorage.getItem(`${valueEmail.text}`)) {
      return false;
    } else {
      return true;
    }
  };

  const handlerBtnSubmit = (e: MouseEvent) => {
    e.preventDefault();
    // проверяем оба поля
    if (regEmail && regPassword) {
      // ищем совпадения мыла в бд
      if (checkLS()) {
        const objAccount = {
          password: `${valuePassword.text}`,
          favorites: [],
        };
        localStorage.setItem(`${valueEmail.text}`, JSON.stringify(objAccount));
        dispatch(addUserLS());
        setValueEmail({ text: "", valid: true });
        setValuePassword({ text: "", valid: true });
        setAccount(true);
        // говарим что такой акк уже есть
      } else {
        dispatch(addUser(true));
      }
      // проверяем по 1 полю
    } else if (!regEmail) {
      setValueEmail({ text: valueEmail.text, valid: false });
    } else if (!regPassword) {
      setValuePassword({ text: valuePassword.text, valid: false });
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.form_box}>
          <h3 className={styles.form_title}>Регистрация</h3>
          <Input
            type="email"
            placeholder="введите почту"
            value={valueEmail.text}
            handler={handlerTypeEmail}
            valid={valueEmail.valid}
          />
          <Input
            type="password"
            placeholder="введите пароль"
            value={valuePassword.text}
            handler={handlerTypePassword}
            valid={valuePassword.valid}
          />
          <Button handler={handlerBtnSubmit}>зарегистрироваться</Button>
          {users && (
            <div className={styles.alreadyHave}>
              Такой аккаунт уже существует
            </div>
          )}
          {account && (
            <div className={styles.success}>Вы успешно зарегестрированны</div>
          )}
          {(!valueEmail.valid || !valuePassword.valid) && (
            <div className={styles.errorBox}>
              <h4>Ошибка ввода</h4>
              {!valueEmail.valid && (
                <div>
                  <p>Введите коректный email адрес</p>
                  <p>example@email.com</p>
                </div>
              )}
              {!valuePassword.valid && (
                <div>
                  <p>
                    Пароль должен содержать <br />
                    буквы в верхнем и нижнем регистре, цифры, спецсимволы
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
