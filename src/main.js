import { Route, Point } from './model';
import { EventsPresenter } from './presenter';
import { render } from './render';
import { AddPointButtonView, FiltersView } from './view';
import { generatePoints } from './mock/generate-points';

const tripContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filtersView = new FiltersView();
const addPointButtonView = new AddPointButtonView();
const eventsPresenter = new EventsPresenter();
const routeModel = new Route();

routeModel.points = Point.parseAll(generatePoints());

render(filtersView, tripContainer);
render(addPointButtonView, tripContainer);

eventsPresenter.init(eventsContainer, routeModel);
