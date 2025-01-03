import { useMovablePoint, Theme, LaTeX } from "mafs";

export const useHalfLifePoint = () => {
  const halfLifePoint = useMovablePoint([4, 0], {
    constrain: ([x]) => [Math.max(x, 1), 0],
    color: Theme.blue,
  });
  const days = (x: number) => `day${x === 1 ? "" : "s"}`;

  return {
    ...halfLifePoint,
    element: (
      <>
        {halfLifePoint.element}
        <LaTeX
          at={[halfLifePoint.x, halfLifePoint.y - 0.75]}
          tex={String.raw`t_{1/2}=${Math.abs(halfLifePoint.x).toFixed(
            2,
          )}\text{ ${days(Math.abs(halfLifePoint.x))}}`}
          color={Theme.blue}
        />
      </>
    ),
  };
};
