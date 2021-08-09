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
  } else if (stations.length == 1) {
    stationsListElement.classList.add('stations--hidden');
    loadTimetable(stations[0]);
  } else {
    stationsListElement.classList.remove('stations--hidden');

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
}

async function loadTimetable({ id, name }: Station) {
  clearChildElements(timeTableElement);
  clearChildElements(stationsListElement);
  stationsListElement.classList.add('stations--hidden');
  searchElement.value = name;

  const date = new Date();
  const hour = date.getHours();
  const yymmdd = date.toISOString().slice(2, 10).replaceAll('-', '');

  const timeTableData = await getTimetable(id, yymmdd, hour);

  if (timeTableData.length > 0) {
    timeTableData.forEach((timeTableItem) => {
      const departureTime = `${timeTableItem.hour}:${timeTableItem.minute}`;
      const departureTrainNumber = timeTableItem.trainNumber;
      const departureDestination = timeTableItem.destination;
      const departureTrainNextStops = timeTableItem.nextStops;

      const nextStops = departureTrainNextStops.map((trainStop) => {
        const trainStopElement = createElement('a', { innerText: trainStop });
        trainStopElement?.addEventListener('click', () => {
          searchElement.value = trainStop;
          loadStations();
        });
        return trainStopElement;
      });

      const destination = createElement('a', {
        innerText: departureDestination,
      });
      destination?.addEventListener('click', () => {
        searchElement.value = departureDestination;
        loadStations();
      });

      timeTableElement.append(
        createElement('div', { innerText: departureTime }),
        createElement('div', { innerText: departureTrainNumber }),
        createElement('div', {
          className: 'destination',
          childElements: [
            destination,
            createElement('div', {
              className: 'nextStops',
              childElements: nextStops,
            }),
          ],
        })
      );
    });
  } else {
    timeTableElement.append(
      createElement('div', { innerText: 'Keine Abfahrten' })
    );
  }
}
