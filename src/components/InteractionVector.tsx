import { DecayFunction, Interaction } from "../types";
import { Point, Vector, Theme, LaTeX } from "mafs";
import { VectorWithHoverTrap } from "./VectorWithHoverTrap";

interface InteractionVectorProps {
  interaction: Interaction;
  decayFunction: DecayFunction;
  now?: number;
  color?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const InteractionVector = ({
  interaction,
  decayFunction,
  now = 0,
  color = Theme.foreground,
  onMouseEnter,
  onMouseLeave,
}: InteractionVectorProps) => {
  const x = now - interaction.x;
  const decayY = decayFunction(x);
  const y = interaction.weight * decayY;

  return (
    <>
      <Vector tail={[x, 0]} tip={[x, interaction.weight]} color="#555" />
      <VectorWithHoverTrap
        tail={[x, 0]}
        tip={[x, y]}
        color={color}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <Point x={x} y={decayY} color={color} />
      {interaction.label && (
        <LaTeX at={[x, y + 0.5]} tex={interaction.label} color={color} />
      )}
    </>
  );
};
