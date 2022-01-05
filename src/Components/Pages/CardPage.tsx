import React, { Suspense } from "react";
import BigCard from "../BigCard/BigCard";
import { useScrollTop } from "../../hooks";

const CardPage: React.FC = () => {
  useScrollTop();

  // сделал ленивую т.к. отзывы грузились на милисикунды быстрее (были короткие дерганья при переходи с нижних карточек)
  const Reviews = React.lazy(() => import("../Reviews/Reviews"));

  return (
    <>
      <BigCard />
      <Suspense fallback={<div />}>
        <Reviews />
      </Suspense>
    </>
  );
};

export default CardPage;
