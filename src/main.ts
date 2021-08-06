import './style.css';
import { getStations, getTimetable } from '../utils/api-bahn';
import { createElement } from '../utils/createElement';
import { clearChildElements } from '../utils/clearChildElements';
import { Station } from './types/stations';

const app = document.querySelector<HTMLDivElement>('#app');

const timeTableElement = createElement('div', {
  id: 'timeTable',
  className: 'timeTable',
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
  className: 'stations stations--hidden',
});
searchElement.addEventListener('focusin', () => (searchElement.value = ''));

const appBody = createElement('section', {
  className: 'wrapper',
  childElements: [
    createElement('label', {
      innerText: 'Bahnhof:',
    }),
    createElement('div', {
      childElements: [searchElement, stationsListElement],
    }),
    timeTableElement,
  ],
});

if (app !== null) {
  app.append(appBody);
}

async function loadStations(): Promise<void> {
  const search = searchElement.value;
  const stations = await getStations(search);

  clearChildElements(stationsListElement);
  if (stations.length == 0) {
    stationsListElement.classList.add('stations--hidden');
  } else {
    stationsListElement.classList.remove('stations--hidden');
  }

  stations.forEach((station) => {
    const stationListItem = createElement('a', {
      innerText: station.name,
      id: `station${station.id}`,
      className: 'station__item',
    });
    stationsListElement.append(stationListItem);
    stationListItem?.addEventListener('click', () => loadTimetable(station));
  });
}

async function loadTimetable({ id, name }: Station) {
  clearChildElements(stationsListElement);
  clearChildElements(timeTableElement);
  searchElement.value = name;

  const date = new Date();
  const hour = date.getHours();
  const yymmdd = date.toISOString().slice(2, 10).replaceAll('-', '');

  const timeTableData = await getTimetable(id, yymmdd, hour);
  timeTableData.forEach((timeTableItem) => {
    const departureTime = `${timeTableItem.hour}:${timeTableItem.minute}`;
    const departureTrainNumber = timeTableItem.trainNumber;
    const departureDestination = timeTableItem.destination;
    const departureTrainNextStops = timeTableItem.nextStops.join(' - ');

    timeTableElement.append(
      createElement('div', { innerText: departureTime }),
      createElement('div', { innerText: departureTrainNumber }),
      createElement('div', {
        innerText: departureDestination,
        childElements: [
          createElement('div', {
            innerText: departureTrainNextStops,
            className: 'nextStops',
          }),
        ],
      })
    );
  });

  if (timeTableData.length > 0)
    stationsListElement.classList.add('stations--hidden');
}
