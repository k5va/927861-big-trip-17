import { render } from '../../render';
import { EditPointView, PointListView, PointView, SortView } from '../../view';

const NUMBER_OF_POINTS = 3;

export default class RoutePresenter {
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
    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
      render(new PointView(), this._pointListView.getElement());
    }
  }
}
