import React from "react";
import styles from "./Button.module.scss";
import cn from "classnames";
import { IBtn } from "../../../types";

const Button: React.FC<IBtn> = ({ isActive, children, handler }) => {
  return (
    <button
      onClick={handler ? handler : () => {}}
      className={cn(styles.btn, isActive && styles.active)}
    >
      {children}
    </button>
  );
};

export default Button;
