import { DecayFunction, Interaction } from "../types";
import { Point, Vector, Theme, LaTeX } from "mafs";

interface InteractionVectorProps {
  interaction: Interaction;
  decayFunction: DecayFunction;
  now?: number;
  color?: string;
}

export const InteractionVector = ({
  interaction,
  decayFunction,
  now = 0,
  color = Theme.foreground,
}: InteractionVectorProps) => {
  const x = now - interaction.x;
  return (
    <>
      <Vector tail={[x, 0]} tip={[x, interaction.weight]} color="#555" />
      <Vector
        tail={[x, 0]}
        tip={[x, interaction.weight * decayFunction(x)]}
        color={color}
      />
      <Point x={x} y={decayFunction(x)} color={color} />
      {interaction.label && (
        <LaTeX
          at={[x, interaction.weight * decayFunction(x) + 0.5]}
          tex={interaction.label}
          color={color}
        />
      )}
    </>
  );
};
