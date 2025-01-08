import { Mafs } from "mafs";
import { AgeAndScoreCoordinates } from "../components/AgeAndScoreCoordinates";
import { TimeBucketDecayPlot } from "../components/TimeBucketDecayPlot";
import { useTimeBucketDecayFunction } from "../hooks/useTimeBucketDecayFunction";

import { InteractionVector } from "../components/InteractionVector";
import { ScorePoint } from "../components/ScorePoint";
import { useTimeRange } from "../hooks/useTimeRange";
import { useCountRange } from "../hooks/useCountRange";

interface TimeBucketPropd {
  hasInteractions?: boolean;
}
const sum = (numbers: number[]) => numbers.reduce((x, y) => x + y, 0);
const avg = (numbers: number[]) =>
  numbers.length ? sum(numbers) / numbers.length : 0;

export const TimeBucket = ({ hasInteractions = false }: TimeBucketPropd) => {
  const timeBucketDecayFunction = useTimeBucketDecayFunction();

  const nowRange = useTimeRange({ initialTime: 4, label: "now", row: 0 });
  const countRange = useCountRange({ initialCount: 6, row: 1 });
  const interactions = [
    { x: 0, weight: 1, label: "i_{1}" },
    { x: 2, weight: 2, label: "i_{2}" },
    { x: 3, weight: 2, label: "i_{3}" },
  ].filter((interaction) => interaction.x <= nowRange.value);

  const score =
    countRange.value *
    avg(
      interactions.map(
        (interaction) =>
          timeBucketDecayFunction(nowRange.value - interaction.x) *
          interaction.weight
      )
    );

  return (
    <>
      <Mafs viewBox={{ x: [0, 9], y: [-1, 7] }} width="auto" height={500}>
        <AgeAndScoreCoordinates />
        <TimeBucketDecayPlot decayFunction={timeBucketDecayFunction} />

        {hasInteractions ? (
          <>
            {interactions.map((interaction, index) => (
              <InteractionVector
                key={index}
                now={nowRange.value}
                interaction={interaction}
                decayFunction={timeBucketDecayFunction}
              />
            ))}
            <ScorePoint x={0} y={score} />
          </>
        ) : null}
      </Mafs>
      {hasInteractions && (
        <>
          {nowRange.element}
          {countRange.element}
        </>
      )}
    </>
  );
};
