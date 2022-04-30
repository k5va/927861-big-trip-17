import { render } from '../../render';
import { EditPointView, PointListView, PointView, SortView } from '../../view';

export default class RoutePresenter {
  _sortView = new SortView();
  _pointListView = new PointListView();

  /**
   * renders events components
   * @param {HTMLElement} container
   */
  init(container, routeModel) {
    this._container = container;
    this._routeModel = routeModel;

    render(this._sortView, this._container);
    render(this._pointListView, this._container);
    render(new EditPointView(), this._pointListView.getElement());

    this._routeModel.points
      .forEach((point) => render(new PointView(point), this._pointListView.getElement()));
  }
}
