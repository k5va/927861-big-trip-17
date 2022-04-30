import { Route, Point } from './model';
import { RoutePresenter } from './presenter';
import { render } from './render';
import { AddPointButtonView, FiltersView } from './view';
import { generatePoints } from './mock/generate-points';

const tripContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');
const filtersView = new FiltersView();
const addPointButtonView = new AddPointButtonView();
const routePresenter = new RoutePresenter();
const routeModel = new Route();

routeModel.points = Point.parseAll(generatePoints());

render(filtersView, tripContainer);
render(addPointButtonView, tripContainer);

routePresenter.init(routeContainer, routeModel);
