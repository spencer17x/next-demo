"use client";
import { useInterval, useMount } from "ahooks";
import React, { useCallback, useState } from "react";
import { clsx } from "clsx";

import "./demo3.scss";

const AmountItem: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    isUpFlag: string;
    isRiseRed: boolean;
  }
> = ({ className, children, isUpFlag, isRiseRed, ...restProps }) => {
  return (
    <div
      className={clsx("amount-item", className, {
        "animating-up-isRiseRed-true": isUpFlag === "up" && isRiseRed,
        "animating-up-isRiseRed-false": isUpFlag === "up" && !isRiseRed,
        "animating-down-isRiseRed-true": isUpFlag === "down" && isRiseRed,
        "animating-down-isRiseRed-false": isUpFlag === "down" && !isRiseRed,
      })}
      {...restProps}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [list, setList] = useState<
    Array<{
      isUpFlag: string;
      isRiseRed: boolean;
      value: number;
    }>
  >([]);

  const update = () => {
    const data = Array.from({ length: 10 }, () => {
      return {
        isUpFlag: Math.random() > 0.5 ? "up" : "down",
        isRiseRed: Math.random() > 0.5,
        value: Math.random() * 100,
      };
    });
    setList(data);
  };

  useInterval(() => {
    update();
  }, 500);

  useMount(() => {
    update();
  });

  const handleEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      console.log("spencer handleEnd");
      const target = event.target as HTMLElement;
      target.classList.remove("animating");
    },
    []
  );

  return (
    <div>
      <div>App</div>
      <div>
        {list.map((item, index) => {
          return (
            <AmountItem
              key={index}
              className={item.isUpFlag !== "equal" ? "animating" : ""}
              isUpFlag={item.isUpFlag}
              isRiseRed={item.isRiseRed}
              onAnimationEnd={handleEnd}
            >
              {item.value}
            </AmountItem>
          );
        })}
      </div>
    </div>
  );
};

export default App;
