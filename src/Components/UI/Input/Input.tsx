import React from "react";
import styles from "./Input.module.scss";
import { IInput } from "../../../types";

const Input: React.FC<IInput> = ({
  type,
  placeholder,
  value,
  handler,
  valid,
}) => {
  return (
    <>
      <input
        onChange={handler}
        className={valid ? styles.input : styles.inputNotValid}
        value={value}
        placeholder={placeholder}
        type={type}
      />
    </>
  );
};

export default Input;
