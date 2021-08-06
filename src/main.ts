import './style.css';
import { getStations } from '../utils/api-bahn';
import { createElement } from '../utils/createElement';

const app = document.querySelector<HTMLDivElement>('#app');

//const stations = JSON.stringify(await getStations('leipzig'));
//8010209

if (app !== null) {
  app.innerHTML = ``;
  //app.append(createElement('p', { innerText: stations }));
}
