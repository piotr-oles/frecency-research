import { useState } from "react";
import { RangeInput } from "../components/RangeInput.tsx";

interface UseTimeRangeParams {
  initialTime: number;
  label: string;
  row: number;
}

export const useTimeRange = ({
  initialTime,
  label,
  row,
}: UseTimeRangeParams) => {
  const [time, setTime] = useState(initialTime);

  return {
    value: time,
    element: (
      <RangeInput
        label={
          <>
            t<sub>{label}</sub> =
          </>
        }
        labelWidth={60}
        description={`${time.toFixed(2)} day`}
        top={row * 30}
        left={0}
        value={time}
        onChange={setTime}
        min={0}
        max={10}
        step={0.01}
      />
    ),
  };
};
