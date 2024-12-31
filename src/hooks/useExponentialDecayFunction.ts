import { useCallback } from 'react';
import { DecayFunction } from '../types.ts';

interface UseExponentialDecayFunctionParams {
    halfLife: number;
}

export const useExponentialDecayFunction = ({
                                                halfLife,
                                            }: UseExponentialDecayFunctionParams): DecayFunction => {
    return useCallback(
        (x: number) => Math.exp(-x * (Math.LN2 / Math.abs(halfLife))),
        [halfLife]
    );
};
