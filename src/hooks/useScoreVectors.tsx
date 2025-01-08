import { vec, Polygon } from "mafs";
import { DecayFunction, Interaction, TimeFunction } from "../types.ts";
import { useScore } from "./useScore.ts";
import { ScorePoint } from "../components/ScorePoint.tsx";
import { InteractionVector } from "../components/InteractionVector.tsx";
import { useState } from "react";
import { VectorWithHoverTrap } from "../components/VectorWithHoverTrap.tsx";

interface UseScoreVectorsParams {
  now: number;
  interactions: Interaction[];
  decayFunction: DecayFunction;
  timeFunction?: TimeFunction;
  color?: string;
  label?: string;
}

export const useScoreVectors = ({
  now,
  interactions,
  decayFunction,
  timeFunction,
  color,
  label = "score",
}: UseScoreVectorsParams) => {
  const [hoveredInteractionIndex, setHoveredInteractionIndex] = useState<
    number | undefined
  >();
  const hoveredInteraction =
    hoveredInteractionIndex !== undefined
      ? interactions[hoveredInteractionIndex]
      : undefined;
  const score = useScore({ now, interactions, decayFunction });
  const x = timeFunction ? timeFunction(score) : 0;
  const stackedVectors = interactions.reduce(
    (vectors, interaction) => {
      const tail: vec.Vector2 = vectors.length
        ? vectors[vectors.length - 1]![1]
        : [x, 0];
      const tip: vec.Vector2 = [
        x,
        tail[1] + decayFunction(now - interaction.x) * interaction.weight,
      ];

      return [...vectors, [tail, tip] as [vec.Vector2, vec.Vector2]];
    },
    [] as [vec.Vector2, vec.Vector2][]
  );

  const element = (
    <>
      {hoveredInteractionIndex !== undefined &&
        hoveredInteraction !== undefined && (
          <>
            <Polygon
              points={[
                [now - hoveredInteraction.x, 0],
                stackedVectors[hoveredInteractionIndex]![0],
                stackedVectors[hoveredInteractionIndex]![1],
                [
                  now - hoveredInteraction.x,
                  hoveredInteraction.weight *
                    decayFunction(now - hoveredInteraction.x),
                ],
              ]}
              color={color}
              strokeStyle="dashed"
            />
          </>
        )}
      {stackedVectors.map(([tail, tip], index) => (
        <VectorWithHoverTrap
          key={index}
          tail={tail}
          tip={tip}
          color={color}
          onMouseEnter={() => setHoveredInteractionIndex(index)}
          onMouseLeave={() => setHoveredInteractionIndex(undefined)}
        />
      ))}
      {interactions.map((interaction, index) => (
        <InteractionVector
          key={index}
          now={now}
          interaction={interaction}
          decayFunction={decayFunction}
          color={color}
          onMouseEnter={() => setHoveredInteractionIndex(index)}
          onMouseLeave={() => setHoveredInteractionIndex(undefined)}
        />
      ))}
      <ScorePoint x={x} y={score} color={color} label={label} />
    </>
  );

  return {
    stackedVectors,
    element,
    score,
  };
};
