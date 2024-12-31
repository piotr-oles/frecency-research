export interface Interaction {
    x: number;
    weight: number;
  }

  export type DecayFunction = (x: number) => number;
  export type TimeFunction = (y: number) => number;

  export interface ViewBox {
    x: [number, number];
    y: [number, number];
  }
