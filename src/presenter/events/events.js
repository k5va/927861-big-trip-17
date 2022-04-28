import { render } from '../../render';
import { EditEventView, EventListView, EventView, SortView } from '../../view';

export default class EventsPresenter {
  _sortView = new SortView();
  _eventListView = new EventListView();

  /**
   * renders events components
   * @param {HTMLElement} container
   */
  init(container) {
    this._container = container;

    render(this._sortView, this._container);
    render(this._eventListView, this._container);
    render(new EditEventView(), this._eventListView.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventView(), this._eventListView.getElement());
    }
  }
}
