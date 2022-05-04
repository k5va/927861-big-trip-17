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
      this.#replaceViewToEdit(pointView, editPointView);
    });

    editPointView.setSaveHandler(() => {
      this.#replaceEdittoView(pointView, editPointView);
    });

    editPointView.setCloseHandler(() => {
      this.#replaceEdittoView(pointView, editPointView);
    });

    render(pointView, this.#pointListView.getElement());
  }

  /**
   * Replaces point view to edit view
   * @param {PointView} pointView - point view
   * @param {PointEditView} editPointView - point edit view
   */
  #replaceViewToEdit(pointView, editPointView) {
    this.#pointListView.getElement().replaceChild(
      editPointView.getElement(), pointView.getElement()
    );
    editPointView.activate();
  }

  /**
   * Replaces edit point view to view
   * @param {PointView} pointView - point view
   * @param {PointEditView} editPointView - point edit view
   */
  #replaceEdittoView(pointView, editPointView) {
    this.#pointListView.getElement().replaceChild(
      pointView.getElement(), editPointView.getElement()
    );
    editPointView.deactivate();
  }
}
