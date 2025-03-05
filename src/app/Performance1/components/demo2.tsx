"use client";
import { useInterval, useMount } from "ahooks";
import { useCallback, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const backgroundFade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// 背景色动画效果
const getBackgroundAnimation = (isUpFlag: string, isRiseRed: boolean) => {
  if (isUpFlag === "up") {
    return css`
      & {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${isRiseRed
          ? "rgba(204, 61, 61, 0.11)"
          : "rgba(17, 173, 122, 0.11)"};
        animation: ${backgroundFade} 0.5s linear;
        z-index: 0;
      }
    `;
  }
  if (isUpFlag === "down") {
    return css`
      & {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${isRiseRed
          ? "rgba(17, 173, 122, 0.11)"
          : "rgba(204, 61, 61, 0.11)"};
        animation: ${backgroundFade} 0.5s linear;
        z-index: 0;
      }
    `;
  }
  return null;
};

export const AmountItem = styled.div`
  position: relative;
  width: 34%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;

const Animating = styled.div<{
  isUpFlag: string;
  isRiseRed: boolean;
}>`
  &.animating {
    ${({ isUpFlag, isRiseRed }) => getBackgroundAnimation(isUpFlag, isRiseRed)};
  }
`;

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
            <AmountItem key={index}>
              <span>{item.value}</span>
              <Animating
                className="animating"
                isUpFlag={item.isUpFlag}
                isRiseRed={item.isRiseRed}
                onAnimationEnd={handleEnd}
              />
            </AmountItem>
          );
        })}
      </div>
    </div>
  );
};

export default App;
