import { DecayFunction, Interaction } from "../types";
import { Point, Vector, Theme } from "mafs";

interface InteractionVectorProps {
  interaction: Interaction;
  decayFunction: DecayFunction;
  now?: number;
}

export const InteractionVector = ({
  interaction,
  decayFunction,
  now = 0,
}: InteractionVectorProps) => {
  const x = now - interaction.x;
  const color = x < 0 ? Theme.pink : Theme.foreground;
  return (
    <>
      <Vector tail={[x, 0]} tip={[x, interaction.weight]} color="#555" />
      <Vector
        tail={[x, 0]}
        tip={[x, interaction.weight * decayFunction(x)]}
        color={color}
      />
      <Point x={x} y={decayFunction(x)} color={color} />
    </>
  );
};
