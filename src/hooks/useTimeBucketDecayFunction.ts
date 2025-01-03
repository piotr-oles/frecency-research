import { useCallback } from "react";

export const useTimeBucketDecayFunction = () => {
  return useCallback((x: number) => {
    if (x < 1.5) {
      return 1;
    }
    if (x < 3) {
      return 0.5;
    }
    if (x < 6) {
      return 0.25;
    }
    return 0.125;
  }, []);
};
