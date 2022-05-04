import { render } from '../../render';
import { EditPointView, PointListView, PointView, SortView } from '../../view';

export default class RoutePresenter {
  #sortView = new SortView();
  #pointListView = new PointListView();
  #container = null;
  #routeModel = null;
  #offersModel = null;
  #destinations = null;

  /**
   * renders events components
   * @param {Route} routeModel - route data
   * @param {Offers} offersModel - offers data
   * @param {Array<Destinations>} destinations - avaliable destinations
   * @param {HTMLElement} container
   */
  init(container, routeModel, offersModel, destinations) {
    this.#container = container;
    this.#routeModel = routeModel;
    this.#offersModel = offersModel;
    this.#destinations = destinations;

    render(this.#sortView, this.#container);
    render(this.#pointListView, this.#container);
    render(
      new EditPointView(
        this.#routeModel.points[0],
        this.#offersModel.getOffers(this.#routeModel.points[0].type),
        this.#destinations),
      this.#pointListView.getElement()
    );

    this.#routeModel.points.forEach(
      (point) => render(
        new PointView(point, this.#offersModel.getOffers(point.type, point.offers)),
        this.#pointListView.getElement()
      )
    );
  }
}
