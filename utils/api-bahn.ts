import { StationRoot, Station } from '../src/types/stations';

export async function getStations(location: string): Promise<Station[]> {
  const urlBase = import.meta.env.VITE_API_STATION_URL;
  const url = `${urlBase}?searchstring=*${location}*&limit=100`;
  const apiKey = import.meta.env.VITE_API_KEY;

  const response = await fetch(url, {
    headers: { Authorization: 'Bearer ' + apiKey },
  });
  const data: StationRoot = await response.json();

  const results: Station[] = data.result.map((resultElement) => {
    return {
      name: resultElement.name,
      id: resultElement.evaNumbers[0].number.toString(),
    };
  });

  return results;
}
