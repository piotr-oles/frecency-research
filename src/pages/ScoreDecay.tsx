import { LaTeX, Mafs, Point, Theme, useStopwatch, Vector } from "mafs";
import { AgeAndScoreCoordinates } from "../components/AgeAndScoreCoordinates";
import { ExponentialDecayPlot } from "../components/ExponentialDecayPlot";
import { useExponentialDecayFunction } from "../hooks/useExponentialDecayFunction";
import { useEffect } from "react";

function easeOutExpo(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function lerp(x: number, y: number, a: number) {
  return x * (1 - a) + y * a;
}

interface Stage {
  name: string;
  duration: number;
}
interface ComputedStage extends Stage {
  start: number;
  end: number;
}

const stages: Stage[] = [
  { name: "map-to-time", duration: 2 },
  { name: "move-on-time", duration: 2 },
  { name: "map-to-score", duration: 2 },
  { name: "wait-after", duration: 2 },
];
const computedStages = stages.reduce<ComputedStage[]>((acc, stage, index) => {
  const start = acc[index - 1]?.end ?? 0;
  const end = start + stage.duration;
  return [...acc, { ...stage, start, end }];
}, []);
const totalDuration = computedStages[computedStages.length - 1].end;

export const ScoreDecay = () => {
  const exponentialDecayFunction = useExponentialDecayFunction({
    halfLife: 4,
  });

  const { time, start } = useStopwatch();
  useEffect(() => start(), [start]);

  const periodicTime = time % totalDuration;
  const currentStage = computedStages.find(
    (stage) => stage.start <= periodicTime && periodicTime < stage.end
  );
  const stageTime = currentStage
    ? (periodicTime - currentStage.start) / currentStage.duration
    : 0;
  const easedStageTime = easeOutExpo(stageTime);

  const score0 = { x: -4, y: exponentialDecayFunction(-4) };
  const score1 = { x: -1, y: exponentialDecayFunction(-1) };

  const s0Point = (
    <>
      <Point x={score0.x} y={score0.y} />
      <LaTeX tex="y_{0}" at={[score0.x, score0.y + 0.5]} />
    </>
  );
  const s1Point = (
    <>
      <Point x={score1.x} y={score1.y} />
      <LaTeX tex="y_{1}" at={[score1.x, score1.y + 0.5]} />
    </>
  );
  const t0Point = (
    <>
      <Point x={score0.x} y={0} />
      <LaTeX tex="t_{0}" at={[score0.x, -0.75]} />
    </>
  );
  const t1Point = (
    <>
      <Point x={score1.x} y={0} />
      <LaTeX tex="t_{1}" at={[score1.x, -0.75]} />
    </>
  );

  return (
    <>
      <Mafs viewBox={{ x: [-6, 1], y: [-1, 7] }} width="auto" height={500}>
        <AgeAndScoreCoordinates />
        <ExponentialDecayPlot decayFunction={exponentialDecayFunction} />
        {currentStage?.name === "map-to-time" && (
          <>
            {s0Point}
            <Vector tail={[score0.x, score0.y]} tip={[score0.x, 0]} />
            <Point
              x={score0.x}
              y={lerp(score0.y, 0, easedStageTime)}
              color={Theme.green}
            />
            <LaTeX
              tex="t_{0} = time(y_{0})"
              at={[score0.x - 1.5, lerp(score0.y, 0, 0.5)]}
            />
          </>
        )}
        {currentStage?.name === "move-on-time" && (
          <>
            {s0Point}
            {t0Point}
            <Vector tail={[score0.x, 0.25]} tip={[score1.x, 0.25]} />
            <Point
              x={lerp(score0.x, score1.x, easedStageTime)}
              y={0}
              color={Theme.green}
            />
            <LaTeX
              tex="t_{1} = t_{0} + \Delta t"
              at={[lerp(score0.x, score1.x, 0.5), 0.5]}
            />
          </>
        )}
        {currentStage?.name === "map-to-score" && (
          <>
            {s0Point}
            {t0Point}
            {t1Point}
            <Vector tail={[score1.x, 0]} tip={[score1.x, score1.y]} />
            <Point
              x={score1.x}
              y={lerp(0, score1.y, easedStageTime)}
              color={Theme.green}
            />
            <LaTeX
              tex="y_{1} = score(t_{1})"
              at={[score1.x - 1.5, lerp(0, score1.y, 0.5)]}
            />
          </>
        )}
        {currentStage?.name === "wait-after" && (
          <>
            {s0Point}
            {s1Point}
            {t0Point}
            {t1Point}
            <Point x={score1.x} y={score1.y} color={Theme.green} />
          </>
        )}
      </Mafs>
    </>
  );
};
