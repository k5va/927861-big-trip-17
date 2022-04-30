import { Route, Point } from './model';
import { EventsPresenter } from './presenter';
import { render } from './render';
import { AddEventButtonView, FiltersView } from './view';
import { generatePoints } from './mock/generate-points';

const tripContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filtersView = new FiltersView();
const addEventButtonView = new AddEventButtonView();
const eventsPresenter = new EventsPresenter();
const routeModel = new Route();

routeModel.points = Point.parseAll(generatePoints());

render(filtersView, tripContainer);
render(addEventButtonView, tripContainer);

eventsPresenter.init(eventsContainer, routeModel);
