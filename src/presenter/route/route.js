import { remove, render } from '../../framework/render';
import { NoPointsView, PointListView, SortView } from '../../view';
import { DISABLED_SORTINGS, NoPointsMessage, Sorting } from '../../const';
import { PointPresenter } from '../../presenter';

export default class RoutePresenter {
  #pointListView = new PointListView();
  #sortView = null;
  #noPointsView = null;
  #container = null;
  #routeModel = null;
  #offersModel = null;
  #destinations = null;
  #pointPresenters = new Map();

  /**
   * Creates new instance of presenter
   * @param {Route} routeModel - route data
   * @param {Offers} offersModel - offers data
   * @param {Array<Destinations>} destinations - available destinations
   * @param {HTMLElement} container
   */
  constructor(container, routeModel, offersModel, destinations) {
    this.#container = container;
    this.#routeModel = routeModel;
    this.#offersModel = offersModel;
    this.#destinations = destinations;

    this.#routeModel.addObserver(this.#changeModelHandler);
  }

  /**
   * Renders points
   */
  init() {
    this.#renderRoute();
  }

  /**
   * Renders route with filters and sorting
   */
  #renderRoute() {
    const points = this.#routeModel.points;
    if (points.length > 0) {
      this.#renderSorting();
      this.#renderPoints(points);
    } else {
      this.#renderNoPoints();
    }
  }

  /**
   * Renders list of points
   * @param {Array<Point>} points - array of points
   */
  #renderPoints(points) {
    render(this.#pointListView, this.#container);
    for (const point of points) {
      const pointPresenter = new PointPresenter(
        this.#pointListView, this.#offersModel, this.#destinations,
        this.#changePointHandler, this.#changeViewModeHandler
      );
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    }
  }

  /**
   * Renders sorting
   */
  #renderSorting() {
    this.#sortView = new SortView(this.#routeModel.sorting, Object.values(Sorting), DISABLED_SORTINGS);
    this.#sortView.setChangeHandler(this.#changeSortingHandler);
    render(this.#sortView, this.#container);
  }

  /**
   * Renders no points message
   */
  #renderNoPoints() {
    this.#noPointsView = new NoPointsView(NoPointsMessage[this.#routeModel.filter]);
    render(this.#noPointsView, this.#container);
  }

  /**
   * Clears points list and destroys all point presenters
   */
  #clearRoute() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortView);
    remove(this.#pointListView);
    remove(this.#noPointsView);
  }

  /**
   * Change point handler
   * @param {Point} updatedPoint - point data
   */
  #changePointHandler = (updatedPoint) => {
    this.#routeModel.updatePoint(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  /**
   * Change point's view mode handler
   */
  #changeViewModeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * Change sorting handler
   * @param {String} sorting - new sorting
   */
  #changeSortingHandler = (sorting) => {
    this.#routeModel.sorting = sorting;
  };

  /**
   * Change model handler
   */
  #changeModelHandler = () => {
    this.#clearRoute();
    this.#renderRoute();
  };
}
