import pool from '../dbConfig/dbConfig.js';
import type { HistoricalIntensity } from '@shared/types';

export async function getRecentIntensities() {
  try {
    const intensities = await pool.query(`
    SELECT * FROM historical_intensity
    WHERE datetime <= NOW()
      AND forecast IS NOT NULL
    ORDER BY datetime DESC
    LIMIT 48
    `);
    return intensities.rows.map((intensity: HistoricalIntensity) => {
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

export async function getDateRange() {
  try {
    const result = await pool.query(`
      SELECT MIN(datetime) AS min_date, Now() AS max_date
        FROM historical_intensity
    `);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error(`Database Error: ${error}`);
  }
}

export async function getFilteredIntensities(filters) {
  const { startDate, endDate } = filters;
  let query = `SELECT * FROM historical_intensity `;
  const values = [];
  if (startDate) {
    query += 'WHERE datetime >= $1 ';
    values.push(startDate);
  }
  if (endDate) {
    query += 'AND datetime <= $2 ';
    values.push(endDate);
  }
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error(`Database Error: ${error}`);
  }
}
