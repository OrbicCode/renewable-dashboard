export async function getHistoricalIntensity() {
  try {
    const response = await fetch('http://localhost:3000/historical/get-intensities/recent');
    if (!response.ok) {
      throw new Error(`Error fetching, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
