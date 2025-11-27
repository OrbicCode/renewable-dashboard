import pool from '../dbConfig/dbConfig.js';

export async function getTenIntensities() {
  try {
    const tenIntensities = await pool.query(`
    SELECT * FROM historical_intensities
    LIMIT 10
    `);
    return tenIntensities;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error(`Database Error: ${error}`);
  }
}
