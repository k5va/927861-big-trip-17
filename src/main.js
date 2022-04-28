import { render } from './render';
import { AddEventButtonView, FiltersView } from './view';

const tripMainElement = document.querySelector('.trip-main');
const filtersView = new FiltersView();
const addEventButtonView = new AddEventButtonView();

render(filtersView, tripMainElement);
render(addEventButtonView, tripMainElement);
