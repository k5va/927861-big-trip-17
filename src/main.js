import { EventsPresenter } from './presenter';
import { render } from './render';
import { AddEventButtonView, FiltersView } from './view';

const tripContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filtersView = new FiltersView();
const addEventButtonView = new AddEventButtonView();
const eventsPresenter = new EventsPresenter();

render(filtersView, tripContainer);
render(addEventButtonView, tripContainer);

eventsPresenter.init(eventsContainer);
