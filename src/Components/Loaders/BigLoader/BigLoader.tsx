import React, { useEffect, useRef, useState } from "react";
import styles from "./BigLoader.module.scss";
import cn from "classnames";

const BigLoader: React.FC = () => {
  let [text, setText] = useState({ text: "MyFilms", textShow: "", counter: 0 });
  let [load, setLoad] = useState(false);

  useEffect(() => {
    if (text.text.length !== text.textShow.length) {
      setTimeout(() => {
        setText({
          text: "myFilms",
          textShow: (text.textShow += text.text[text.counter]),
          counter: (text.counter = text.counter + 1),
        });
      }, 200);
    } else {
      setLoad(true);
    }
  }, [text]);

  return (
    <div className={styles.wrapper}>
      <span className={cn(styles.bigLoader, load && styles.loaded)}>
        {text.textShow}
      </span>
    </div>
  );
};
export default BigLoader;
