import React from "react";
import styles from "./Pagination.module.scss";
import Button from "../Button/Button";
import { useAppDispatch } from "../../../hooks";
import { setActivePage } from "../../../store/catalogSlice";
import { IPagination } from "../../../types";

const Pagination: React.FC<IPagination> = ({
  totalPages,
  pageActiveNum,
  titleCatalogRef,
}) => {
  const arrBtn: Array<boolean> = Array(totalPages && totalPages / 20).fill(
    false
  );

  const scrollToTitle = () => {
    const topPos = titleCatalogRef.current?.offsetTop;
    window.scrollTo({ top: topPos ? topPos - 100 : 0, behavior: "smooth" });
  };

  const dispatch = useAppDispatch();
  const setActiveBtn = (index: number) => {
    dispatch(setActivePage(index + 1));
    scrollToTitle();
  };

  return (
    <ul className={styles.paginationBox}>
      {arrBtn.map((el, index) => (
        <li onClick={() => setActiveBtn(index)}>
          <Button isActive={index === pageActiveNum - 1 ? true : false}>
            {index + 1}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
