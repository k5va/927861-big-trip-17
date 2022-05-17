import { remove, render } from '../../framework/render';
import { NoPointsView, PointListView, SortView } from '../../view';
import { DISABLED_SORTINGS, NoPointsMessage, Sorting } from '../../const';
import { PointPresenter } from '../../presenter';
import Store from '../../store/store';
import { filterPoints, sortPoints } from '../../utils';

export default class RoutePresenter {
  #pointListView = new PointListView();
  #sortView = null;
  #noPointsView = null;
  #container = null;
  #appStore = Store.getInstance();
  #pointPresenters = new Map();

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container - HTML container
   */
  constructor(container) {
    this.#container = container;

    this.#appStore.addObserver(this.#changeStoreHandler);
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
    const points = this.#appStore.points;
    if (points.length > 0) {
      this.#renderSorting();
      this.#renderPoints(points);
    } else {
      this.#renderNoPoints();
    }
  }

  /**
   * Renders list of points
   */
  #renderPoints() {
    const points = sortPoints(
      filterPoints(this.#appStore.points, this.#appStore.filter), this.#appStore.sorting
    );
    render(this.#pointListView, this.#container);
    for (const point of points) {
      const pointPresenter = new PointPresenter(
        this.#pointListView, this.#changeViewModeHandler
      );
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    }
  }

  /**
   * Renders sorting
   */
  #renderSorting() {
    this.#sortView = new SortView(this.#appStore.sorting, Object.values(Sorting), DISABLED_SORTINGS);
    this.#sortView.setChangeHandler(this.#changeSortingHandler);
    render(this.#sortView, this.#container);
  }

  /**
   * Renders no points message
   */
  #renderNoPoints() {
    this.#noPointsView = new NoPointsView(NoPointsMessage[this.#appStore.filter]);
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
   * Change point's view mode handler
   */
  #changeViewModeHandler = () => { // TODO: refactore to store
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * Change sorting handler
   * @param {String} sorting - new sorting
   */
  #changeSortingHandler = (sorting) => {
    this.#appStore.sorting = sorting;
  };

  /**
   * Change model handler
   */
  #changeStoreHandler = () => {
    this.#clearRoute();
    this.#renderRoute();
  };
}
