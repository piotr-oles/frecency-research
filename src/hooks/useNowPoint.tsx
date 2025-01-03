import { useMovablePoint, Theme, Line } from "mafs";

export const useNowPoint = () => {
  const nowPoint = useMovablePoint([0, 0], {
    constrain: ([x]) => [x, 0],
    color: Theme.yellow,
  });

  return {
    ...nowPoint,
    element: (
      <>
        <Line.ThroughPoints
          point1={nowPoint.point}
          point2={[nowPoint.x, -1]}
          color={Theme.yellow}
        />
        {nowPoint.element}
      </>
    ),
  };
};
