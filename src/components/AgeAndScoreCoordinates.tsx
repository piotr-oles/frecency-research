import { Coordinates, Text } from "mafs";

export const AgeAndScoreCoordinates = () => {
  const days = (x: number) => `day${x === 1 ? "" : "s"}`;

  return (
    <>
      <Coordinates.Cartesian
        subdivisions={2}
        xAxis={{
          labels: (x) => `${x} ${days(x)}`,
        }}
      />
      <Text x={0} y={0} attach="n" attachDistance={16} size={16}>
        Age
      </Text>
    </>
  );
};
