import { useCallback } from "react";
import { DecayFunction } from "../types.ts";

interface UseExponentialTimeFunctionParams {
  halfLife: number;
}

export const useExponentialTimeFunction = ({
  halfLife,
}: UseExponentialTimeFunctionParams): DecayFunction => {
  return useCallback(
    (y: number) => Math.log(y) / -(Math.LN2 / Math.abs(halfLife)),
    [halfLife],
  );
};
