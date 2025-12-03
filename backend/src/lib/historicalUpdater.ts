import pool from '../dbConfig/dbConfig.js';
import type { IntensityDataArray } from '@shared/types';

async function intensityUpdater() {
  console.log('Updating historical intensity data...');

  const result = await pool.query(`
      SELECT datetime FROM historical_intensity
      WHERE datetime <= NOW()
       AND actual IS NOT NULL
      ORDER BY datetime DESC
      LIMIT 1
    `);

  const lastknown = result.rows[0]?.datetime;

  const from = lastknown && new Date(new Date(lastknown).getTime() + 30 * 60 * 1000).toISOString();

  const to = new Date().toISOString();

  const response = await fetch(`https://api.carbonintensity.org.uk/intensity/${from}/${to}`);
  if (!response.ok) throw new Error(`Error fetching intensity data, status: ${response.status}`);

  const { data } = (await response.json()) as IntensityDataArray;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    for (const point of data) {
      await client.query(
        `
        INSERT INTO historical_intensity (datetime, actual, forecast, index)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (datetime) DO UPDATE SET
          actual = EXCLUDED.actual,
          forecast = Excluded.forecast,
          index = Excluded.index
        `,
        [
          point.from,
          point.intensity.actual || null,
          point.intensity.forecast,
          point.intensity.index,
        ]
      );
    }
    await client.query('COMMIT');
    console.log(`Added/updated ${data.length} records`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

intensityUpdater().catch(console.error);

setInterval(
  () => {
    intensityUpdater();
  },
  30 * 60 * 1000
);
