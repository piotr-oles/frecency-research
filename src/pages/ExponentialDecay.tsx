import { LaTeX, Line, Mafs, Theme, vec } from "mafs";
import { ExponentialDecayPlot } from "../components/ExponentialDecayPlot";
import { useHalfLifePoint } from "../hooks/useHalfLifePoint";
import { useExponentialDecayFunction } from "../hooks/useExponentialDecayFunction";
import { AgeAndScoreCoordinates } from "../components/AgeAndScoreCoordinates";
import { useTimeRange } from "../hooks/useTimeRange";
import { useScoreVectors } from "../hooks/useScoreVectors";
import { useExponentialTimeFunction } from "../hooks/useExponentialTimeFunction";
import { lerp } from "../functions/lerp";
import { useMemo } from "react";

interface ExponentialDecayProps {
  hasHalfLifePoint?: boolean;
  hasInteractions?: boolean;
  hasMappedScore?: boolean;
  hasOrigin?: boolean;
}

export const ExponentialDecay = ({
  hasHalfLifePoint = false,
  hasInteractions = false,
  hasMappedScore = false,
  hasOrigin = false,
}: ExponentialDecayProps) => {
  const halfLifePoint = useHalfLifePoint();

  const exponentialDecayFunction = useExponentialDecayFunction({
    halfLife: halfLifePoint.x,
  });
  const exponentialTimeFunction = useExponentialTimeFunction({
    halfLife: halfLifePoint.x,
  });

  const nowRange = useTimeRange({ initialTime: 4, label: "now", row: 0 });
  const originRange = useTimeRange({ initialTime: 0, label: "origin", row: 1 });
  const interactions = [
    { x: 0, weight: 1, label: "i_{1}" },
    { x: 2, weight: 2, label: "i_{2}" },
    { x: 3, weight: 2, label: "i_{3}" },
  ].filter((interaction) => interaction.x <= nowRange.value);
  const scoreNowVectors = useScoreVectors({
    now: nowRange.value,
    interactions,
    decayFunction: exponentialDecayFunction,
    timeFunction: hasMappedScore ? exponentialTimeFunction : undefined,
    label: "score(t_{now})",
  });
  const scoreOriginVectors = useScoreVectors({
    now: originRange.value,
    interactions,
    decayFunction: exponentialDecayFunction,
    timeFunction: hasMappedScore ? exponentialTimeFunction : undefined,
    color: Theme.yellow,
    label: "score(t_{origin})",
  });
  const scoreNowTime = exponentialTimeFunction(scoreNowVectors.score);
  const scoreOriginTime = exponentialTimeFunction(scoreOriginVectors.score);

  const viewBox = useMemo<{
    x?: vec.Vector2;
    y?: vec.Vector2;
    padding?: number;
  }>(() => {
    switch (true) {
      case hasOrigin:
        return { x: [-10, 4], y: [-1, 9] };
      case hasMappedScore:
        return { x: [-7, 7], y: [-1, 7] };
      default:
        return { x: [0, 9], y: [-1, 7] };
    }
  }, [hasOrigin, hasMappedScore]);

  return (
    <>
      <Mafs viewBox={viewBox} width="auto" height={hasOrigin ? 700 : 500}>
        <AgeAndScoreCoordinates />
        <ExponentialDecayPlot decayFunction={exponentialDecayFunction} />
        {hasOrigin && Math.abs(scoreNowTime - scoreOriginTime) > 0 && (
          <>
            <Line.Segment
              point1={[scoreOriginTime, 0.25]}
              point2={[scoreNowTime, 0.25]}
            />
            <LaTeX
              at={[lerp(scoreOriginTime, scoreNowTime, 0.5), 0.5]}
              tex={
                Math.abs(scoreNowTime - scoreOriginTime) > 3.5
                  ? "\\Delta t = t_{now} - t_{origin} "
                  : "\\Delta t"
              }
            />
          </>
        )}
        {hasHalfLifePoint && halfLifePoint.element}
        {hasInteractions && scoreNowVectors.element}
        {hasOrigin && scoreOriginVectors.element}
      </Mafs>
      {hasInteractions && nowRange.element}
      {hasOrigin && originRange.element}
    </>
  );
};
