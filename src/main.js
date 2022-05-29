import { Point, Offer } from './model';
import { RoutePresenter } from './presenter';
import { generateOffers } from './mock/generate-offers';
import { generateDestinations } from './mock/generate-destinations';
import { generatePoints } from './mock/generate-points';
import { appStore, Actions } from './store';

const DATA_LOAD_DELAY = 2000;

const headContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');

(new Promise((resolve) => {
  setTimeout(() => resolve({
    points: Point.parseAll(generatePoints()),
    offers: Offer.parseAll(generateOffers()),
    destinations: generateDestinations(),
  }), DATA_LOAD_DELAY);
})).then((data) => appStore.dispatch(Actions.DATA_LOADED, data));

const routePresenter = new RoutePresenter(routeContainer, headContainer);
routePresenter.init();
