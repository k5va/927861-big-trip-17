import { render } from '../../render';
import { EditPointView, PointListView, PointView, SortView } from '../../view';

export default class RoutePresenter {
  _sortView = new SortView();
  _pointListView = new PointListView();

  /**
   * renders events components
   * @param {Route} routeModel - route data
   * @param {Offers} offersModel - offers data
   * @param {HTMLElement} container
   */
  init(container, routeModel, offersModel) {
    this._container = container;
    this._routeModel = routeModel;
    this._offersModel = offersModel;

    render(this._sortView, this._container);
    render(this._pointListView, this._container);
    render(
      new EditPointView(
        this._routeModel.points[0], this._offersModel.getOffers(this._routeModel.points[0].type)
      ), this._pointListView.getElement()
    );

    this._routeModel.points.forEach(
      (point) => render(
        new PointView(point, this._offersModel.getOffers(point.type, point.offers)),
        this._pointListView.getElement()
      )
    );
  }
}
