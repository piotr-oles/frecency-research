import { Point, Text, Theme } from "mafs";

interface ScorePointProps {
  x?: number;
  y: number;
}

export const ScorePoint = ({ x = 0, y }: ScorePointProps) => {
  return (
    <>
      <Point x={x} y={y} color={Theme.green} />
      <Text
        x={x}
        y={y}
        color={Theme.green}
        size={20}
        attach="e"
        attachDistance={20}
      >
        score = {y.toFixed(4)}
      </Text>
    </>
  );
};
