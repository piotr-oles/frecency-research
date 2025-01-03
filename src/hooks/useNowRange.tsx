import { useState } from "react";
import { RangeInput } from "../components/RangeInput.tsx";

export const useNowRange = (initialNow = 4) => {
  const [now, setNow] = useState(initialNow);

  return {
    value: now,
    element: (
      <RangeInput
        label={
          <>
            t<sub>now</sub> =
          </>
        }
        labelWidth={60}
        description={`${now.toFixed(2)} day`}
        top={0}
        left={0}
        value={now}
        onChange={setNow}
        min={0}
        max={10}
        step={0.01}
      />
    ),
  };
};
