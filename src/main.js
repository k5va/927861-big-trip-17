import { Point, Offer } from './model';
import { FilterPresenter, RoutePresenter } from './presenter';
import { render } from './framework/render';
import { AddPointButtonView} from './view';
import { generateOffers } from './mock/generate-offers';
import { generateDestinations } from './mock/generate-destinations';
import { generatePoints } from './mock/generate-points';
import { Store, reducer, Actions } from './store';

const tripContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');
const addPointButtonView = new AddPointButtonView();

const store = new Store(reducer);
store.dispatch(Actions.DATA_LOADED, {
  points: Point.parseAll(generatePoints()),
  offers: Offer.parseAll(generateOffers()),
  destinations: generateDestinations(),
});

const routePresenter = new RoutePresenter(routeContainer, store);
const filterPresenter = new FilterPresenter(tripContainer, store);

filterPresenter.init();
render(addPointButtonView, tripContainer);
routePresenter.init();
