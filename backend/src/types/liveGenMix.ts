export type GenMixData = {
  data: GenMix;
};

export interface GenMix {
  from: Date;
  to: Date;
  generationmix: GenMixFuelType[];
}

export interface GenMixFuelType {
  fuel: string;
  perc: number;
}
