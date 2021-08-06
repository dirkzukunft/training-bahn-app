import './style.css';
import { getStations, getTimetable } from '../utils/api-bahn';
import { createElement } from '../utils/createElement';

const app = document.querySelector<HTMLDivElement>('#app');

const selectStation = createElement('section', {
  childElements: [
    createElement('label', {
      innerText: 'Bahnhof:',
      childElements: [
        createElement('input', {
          type: 'text',
          id: 'search',
          name: 'search',
          oninput: loadStations,
        }),
      ],
    }),
    createElement('div', {
      id: 'stations',
    }),
    createElement('div', {
      id: 'result',
    }),
  ],
});

//console.log(await getTimetable('8010209'));

if (app !== null) {
  app.append(selectStation);
  document.querySelector('#search')?.setAttribute('list', 'stationsList');
}

async function loadStations() {
  const searchElement = <HTMLInputElement>document.querySelector('#search');
  const search = searchElement.value;
  const stationsList = <HTMLElement>document.querySelector('#stations');

  const stations = await getStations(search);

  while (stationsList.firstChild) {
    stationsList.removeChild(stationsList.firstChild);
  }
  stations.map((station) =>
    stationsList.append(
      createElement('a', {
        innerText: station.name,
        id: station.id,
        class: 'station',
      })
    )
  );
}

//   const result = <HTMLDivElement>document.querySelector('#result');
