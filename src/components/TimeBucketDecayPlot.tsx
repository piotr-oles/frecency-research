import { Plot, Theme } from "mafs";
import { DecayFunction } from "../types";

interface TimeBucketDecayPlotProps {
  decayFunction: DecayFunction;
}

export const TimeBucketDecayPlot = ({
  decayFunction,
}: TimeBucketDecayPlotProps) => {
  return (
    <Plot.OfX
      y={decayFunction}
      domain={[0, Number.POSITIVE_INFINITY]}
      color={Theme.blue}
    />
  );
};
