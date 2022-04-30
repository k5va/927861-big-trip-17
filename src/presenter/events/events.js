import { render } from '../../render';
import { EditPointView, PointListView, PointView, SortView } from '../../view';

const NUMBER_OF_EVENTS = 3;

export default class EventsPresenter {
  _sortView = new SortView();
  _pointListView = new PointListView();

  /**
   * renders events components
   * @param {HTMLElement} container
   */
  init(container) {
    this._container = container;

    render(this._sortView, this._container);
    render(this._pointListView, this._container);
    render(new EditPointView(), this._pointListView.getElement());
    for (let i = 0; i < NUMBER_OF_EVENTS; i++) {
      render(new PointView(), this._pointListView.getElement());
    }
  }
}
