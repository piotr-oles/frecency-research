import { useState } from "react";
import { RangeInput } from "../components/RangeInput.tsx";

interface UseCountRangeParams {
  initialCount: number;
  row: number;
}

export const useCountRange = ({ initialCount, row }: UseCountRangeParams) => {
  const [count, setCount] = useState(initialCount);

  return {
    value: count,
    element: (
      <RangeInput
        label="count ="
        labelWidth={60}
        description={`${count.toFixed(0)}`}
        top={row * 30}
        left={0}
        value={count}
        onChange={setCount}
        min={1}
        max={10}
        step={1}
      />
    ),
  };
};
