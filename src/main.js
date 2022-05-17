import { Point, Offer } from './model';
import Store from './store/store';
import { FilterPresenter, RoutePresenter } from './presenter';
import { render } from './framework/render';
import { AddPointButtonView} from './view';
import { generateOffers } from './mock/generate-offers';
import { generateDestinations } from './mock/generate-destinations';
import { generatePoints } from './mock/generate-points';

const tripContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');
const addPointButtonView = new AddPointButtonView();

Store.init(
  Point.parseAll(generatePoints()), Offer.parseAll(generateOffers()), generateDestinations()
);

const routePresenter = new RoutePresenter(routeContainer);
const filterPresenter = new FilterPresenter(tripContainer);

filterPresenter.init();
render(addPointButtonView, tripContainer);
routePresenter.init();
