import { Interaction } from '../types.ts';

interface UseInteractionsParams {
    x?: number;
    interactions: Interaction[];
}
export const useInteractions = ({
                                    x = 0,
                                    interactions,
                                }: UseInteractionsParams) => {
    return interactions.map((interaction) => ({
        x: x + interaction.x,
        weight: interaction.weight,
    }));
};
