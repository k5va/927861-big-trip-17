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
   * Creates new instance of presenter
   * @param {Route} routeModel - route data
   * @param {Offers} offersModel - offers data
   * @param {Array<Destinations>} destinations - avaliable destinations
   * @param {HTMLElement} container
   */
  constructor(container, routeModel, offersModel, destinations) {
    this.#container = container;
    this.#routeModel = routeModel;
    this.#offersModel = offersModel;
    this.#destinations = destinations;
  }

  /**
   * Renders points
   */
  init() {
    render(this.#sortView, this.#container);
    render(this.#pointListView, this.#container);

    this.#routeModel.points.forEach((point) => this.#renderPoint(point));
  }

  /**
   * renders given point
   * @param {Point} point - point data
   */
  #renderPoint(point) {
    const pointView = new PointView(point, this.#offersModel.getOffers(point.type, point.offers));
    const editPointView = new EditPointView(
      point,
      this.#offersModel.getOffers(point.type),
      this.#destinations
    );

    pointView.setEditHandler(() => {
      this.#pointListView.getElement().replaceChild(
        editPointView.getElement(), pointView.getElement()
      );
    });

    editPointView.setSaveHandler(() => {
      this.#pointListView.getElement().replaceChild(
        pointView.getElement(), editPointView.getElement()
      );
    });

    render(pointView, this.#pointListView.getElement());
  }
}
