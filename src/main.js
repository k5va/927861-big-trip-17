import { Route, Point, Offers } from './model';
import { RoutePresenter } from './presenter';
import { render } from './render';
import { AddPointButtonView, FiltersView } from './view';
import { generatePoints } from './mock/generate-points';
import { generateOffers } from './mock/generate-offers';

const tripContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');
const filtersView = new FiltersView();
const addPointButtonView = new AddPointButtonView();
const routePresenter = new RoutePresenter();
const routeModel = new Route();
const offersModel = Offers.parse(generateOffers());

routeModel.points = Point.parseAll(generatePoints()); // TODO: make same as offers parse

render(filtersView, tripContainer);
render(addPointButtonView, tripContainer);

routePresenter.init(routeContainer, routeModel, offersModel);
