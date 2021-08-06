import './style.css';
import { getStations, getTimetable } from '../utils/api-bahn';
import { createElement } from '../utils/createElement';
import { clearChildElements } from '../utils/clearChildElements';

const app = document.querySelector<HTMLDivElement>('#app');

const resultElement = createElement('div', {
  id: 'result',
});

const searchElement = createElement('input', {
  type: 'text',
  id: 'search',
  name: 'search',
  className: 'search',
  oninput: loadStations,
});

const stationsListElement = createElement('div', {
  id: 'stations',
  className: 'stations',
});

const appBody = createElement('section', {
  className: 'wrapper',
  childElements: [
    createElement('label', {
      innerText: 'Bahnhof:',
    }),
    createElement('div', {
      childElements: [searchElement, stationsListElement],
    }),
    resultElement,
  ],
});

if (app !== null) {
  app.append(appBody);
}

async function loadStations(): Promise<void> {
  const search = searchElement.value;
  const stations = await getStations(search);

  clearChildElements(stationsListElement);

  stations.map((station) => {
    const stationListItem = createElement('a', {
      innerText: station.name,
      id: `station${station.id}`,
      className: 'station__item',
    });
    stationsListElement.append(stationListItem);
    stationListItem?.addEventListener('click', () => loadTimetable(station.id));
  });
}

async function loadTimetable(id: string) {
  console.log(id);
  console.log(await getTimetable(id));
}

//   const result = <HTMLDivElement>document.querySelector('#result');
