import { Polygon, vec, Vector } from "mafs";

interface VectorWithHoverTrapProps {
  tail: vec.Vector2;
  tip: vec.Vector2;
  padding?: number;
  color?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const VectorWithHoverTrap = ({
  tail,
  tip,
  padding = 0.25,
  color,
  onMouseEnter,
  onMouseLeave,
}: VectorWithHoverTrapProps) => {
  return (
    <>
      <Vector tail={tail} tip={tip} color={color} />
      <Polygon
        points={[
          [tail[0] - padding, tail[1] - padding],
          [tail[0] + padding, tail[1] - padding],
          [tip[0] + padding, tip[1] + padding],
          [tip[0] - padding, tip[1] + padding],
        ]}
        color="transparent"
        svgPolygonProps={{
          onMouseEnter,
          onMouseLeave,
        }}
      />
    </>
  );
};
