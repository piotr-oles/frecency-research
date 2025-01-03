import { useState } from "react";
import { RangeInput } from "../components/RangeInput.tsx";

export const useCountRange = (initialCount = 6) => {
  const [count, setCount] = useState(initialCount);

  return {
    value: count,
    element: (
      <RangeInput
        label="count ="
        labelWidth={60}
        description={`${count.toFixed(0)}`}
        top={30}
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
