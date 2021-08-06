import { StationRoot, Station } from '../src/types/stations';
import { TimetableAPIObject, TimetableItem } from '../src/types/timetable';
import { xml2json } from './xml2json';

export async function getStations(location: string): Promise<Station[]> {
  if (!location) return [];

  const urlBase = import.meta.env.VITE_API_STATIONS_URL;
  const url = `${urlBase}?searchstring=*${location}*&limit=100`;
  const apiKey = import.meta.env.VITE_API_KEY;

  const response = await fetch(url, {
    headers: { Authorization: 'Bearer ' + apiKey },
  });

  if (response.status == 200) {
    const data: StationRoot = await response.json();
    const results: Station[] = data.result.map((resultElement) => {
      return {
        name: resultElement.name,
        id: resultElement.evaNumbers[0].number.toString(),
      };
    });
    return results;
  } else {
    return [];
  }
}

export async function getTimetable(
  locationId: string
): Promise<TimetableItem[]> {
  const date = '210806';
  const hour = '18';
  const urlBase = import.meta.env.VITE_API_TIMETABLE_URL;
  const url = `${urlBase}/${locationId}/${date}/${hour}`;
  const apiKey = import.meta.env.VITE_API_KEY;

  const response = await fetch(url, {
    headers: { Authorization: 'Bearer ' + apiKey },
  });
  const dataXML = await response.text();
  const data: TimetableAPIObject = await xml2json(dataXML);

  const results: TimetableItem[] = data.timetable.s.map((resultElement) => {
    return {
      year: resultElement.dp.pt.slice(0, 2),
      month: resultElement.dp.pt.slice(2, 4),
      day: resultElement.dp.pt.slice(4, 6),
      hour: resultElement.dp.pt.slice(6, 8),
      minute: resultElement.dp.pt.slice(8, 10),
      destination: resultElement.dp.ppth.split('|').slice(-1)[0],
      trainNumber: `${resultElement.tl.c} ${resultElement.dp.l}`,
      nextStops: resultElement.dp.ppth.split('|'),
    };
  });

  return results;
}
