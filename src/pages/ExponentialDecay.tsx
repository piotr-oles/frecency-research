import { Mafs } from "mafs";
import { ExponentialDecayPlot } from "../components/ExponentialDecayPlot";
import { useHalfLifePoint } from "../hooks/useHalfLifePoint";
import { useExponentialDecayFunction } from "../hooks/useExponentialDecayFunction";
import { AgeAndScoreCoordinates } from "../components/AgeAndScoreCoordinates";
import { useNowRange } from "../hooks/useNowRange";
import { InteractionVector } from "../components/InteractionVector";
import { useScoreVectors } from "../hooks/useScoreVectors";
import { useExponentialTimeFunction } from "../hooks/useExponentialTimeFunction";

interface ExponentialDecayProps {
  hasHalfLifePoint?: boolean;
  hasInteractions?: boolean;
  hasMappedScore?: boolean;
}

export const ExponentialDecay = ({
  hasHalfLifePoint = false,
  hasInteractions = false,
  hasMappedScore = false,
}: ExponentialDecayProps) => {
  const halfLifePoint = useHalfLifePoint();

  const exponentialDecayFunction = useExponentialDecayFunction({
    halfLife: halfLifePoint.x,
  });
  const exponentialTimeFunction = useExponentialTimeFunction({
    halfLife: halfLifePoint.x,
  });

  const nowRange = useNowRange(4);
  const interactions = [
    { x: 0, weight: 1 },
    { x: 2, weight: 2 },
    { x: 3, weight: 2 },
  ].filter((interaction) => interaction.x <= nowRange.value);
  // const score = sum(
  //     interactions.map(
  //         (interaction) =>
  //             exponentialDecayFunction(nowRange.value - interaction.x) *
  //             interaction.weight
  //     )
  // );
  const scoreVectors = useScoreVectors({
    now: nowRange.value,
    interactions,
    decayFunction: exponentialDecayFunction,
    timeFunction: hasMappedScore ? exponentialTimeFunction : undefined,
  });

  return (
    <>
      <Mafs
        viewBox={{ x: hasMappedScore ? [-7, 7] : [0, 9], y: [-1, 7] }}
        width="auto"
        height={500}
      >
        <AgeAndScoreCoordinates />
        <ExponentialDecayPlot decayFunction={exponentialDecayFunction} />
        {hasHalfLifePoint && halfLifePoint.element}
        {hasInteractions ? (
          <>
            {interactions.map((interaction, index) => (
              <InteractionVector
                key={index}
                now={nowRange.value}
                interaction={interaction}
                decayFunction={exponentialDecayFunction}
              />
            ))}
            {scoreVectors.element}
          </>
        ) : null}
      </Mafs>
      {hasInteractions && nowRange.element}
    </>
  );
};
