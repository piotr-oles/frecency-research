import { LaTeX, Point } from "mafs";

interface ScorePointProps {
  x?: number;
  y: number;
  color?: string;
  label?: string;
}

export const ScorePoint = ({
  x = 0,
  y,
  color,
  label = `score`,
}: ScorePointProps) => {
  return (
    <>
      <Point x={x} y={y} color={color} />
      <LaTeX
        at={[x, y + 0.5]}
        color={color}
        tex={`${label} = ${y.toFixed(4)}`}
      />
    </>
  );
};
