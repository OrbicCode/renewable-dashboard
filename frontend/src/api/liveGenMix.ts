export async function getLiveGenMixData() {
  try {
    const response = await fetch('http://localhost:3000/live/generationmix');
    if (!response.ok) {
      throw new Error(`Error fetching, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
