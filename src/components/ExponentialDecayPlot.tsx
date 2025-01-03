import { Plot, Theme } from "mafs";
import { DecayFunction } from "../types";

export interface ExponentialDecayPlotProps {
  decayFunction: DecayFunction;
}
export const ExponentialDecayPlot = ({
  decayFunction,
}: ExponentialDecayPlotProps) => {
  return <Plot.OfX y={decayFunction} color={Theme.blue} />;
};
