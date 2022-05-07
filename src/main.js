import { Route, Point, Offers } from './model';
import { RoutePresenter } from './presenter';
import { render } from './framework/render';
import { AddPointButtonView, FiltersView } from './view';
import { generateOffers } from './mock/generate-offers';
import { generateDestinations } from './mock/generate-destinations';
import { generatePoints } from './mock/generate-points';

const tripContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');
const filtersView = new FiltersView();
const addPointButtonView = new AddPointButtonView();
const routeModel = new Route();
const offersModel = Offers.parse(generateOffers());
const destinations = generateDestinations();
const routePresenter = new RoutePresenter(routeContainer, routeModel, offersModel, destinations);

routeModel.points = Point.parseAll(generatePoints()); // TODO: make same as offers parse

render(filtersView, tripContainer);
render(addPointButtonView, tripContainer);

routePresenter.init();
