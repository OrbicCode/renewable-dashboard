import pool from '../dbConfig/dbConfig.js';
import type { HistoricalIntensity } from '@shared/types';

export async function getTenIntensities() {
  try {
    const tenIntensities = await pool.query(`
    SELECT * FROM historical_intensity
    LIMIT 10
    `);
    return tenIntensities.rows.map((intensity: HistoricalIntensity) => {
      return {
        id: intensity.id,
        datetime: intensity.datetime,
        forecast: Number(intensity.forecast),
        actual: Number(intensity.actual),
        index: intensity.index,
      };
    });
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error(`Database Error: ${error}`);
  }
}
