import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      Сайт разработан Mehader с использованием React technology
    </div>
  );
};

export default Footer;
