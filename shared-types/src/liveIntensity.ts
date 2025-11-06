export type IntensityDataArray = {
  data: IntensityData[];
};

export interface IntensityData {
  from: Date;
  to: Date;
  intensity: Intensity;
}

export interface Intensity {
  forecast: number;
  actual: number;
  index: string;
}
