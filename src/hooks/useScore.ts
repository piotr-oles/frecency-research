import { DecayFunction, Interaction } from "../types.ts";

interface UseScoreParams {
  interactions: Interaction[];
  decayFunction: DecayFunction;
  now: number;
}

export const useScore = ({
  interactions,
  decayFunction,
  now,
}: UseScoreParams) => {
  return interactions.reduce(
    (sum, interaction) =>
      sum + decayFunction(now - interaction.x) * interaction.weight,
    0,
  );
};
