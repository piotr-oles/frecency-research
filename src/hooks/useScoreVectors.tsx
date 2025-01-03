import { vec, Vector, Theme } from "mafs";
import { DecayFunction, Interaction, TimeFunction } from "../types.ts";
import { useScore } from "./useScore.ts";
import { ScorePoint } from "../components/ScorePoint.tsx";

interface UseScoreVectorsParams {
  now: number;
  interactions: Interaction[];
  decayFunction: DecayFunction;
  timeFunction?: TimeFunction;
}

export const useScoreVectors = ({
  now,
  interactions,
  decayFunction,
  timeFunction,
}: UseScoreVectorsParams) => {
  const score = useScore({ now, interactions, decayFunction });
  const x = timeFunction ? timeFunction(score) : 0;
  const vectors = interactions.reduce(
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
    [] as [vec.Vector2, vec.Vector2][],
  );

  const element = (
    <>
      {vectors.map(([tail, tip], index) => (
        <Vector key={index} tail={tail} tip={tip} color={Theme.green} />
      ))}
      <ScorePoint x={x} y={score} />
    </>
  );

  return {
    vectors,
    element,
  };
};
