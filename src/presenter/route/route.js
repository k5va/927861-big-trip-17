import { remove, render } from '../../framework/render';
import { NoPointsView, PointListView } from '../../view';
import { NoPointsMessage } from '../../const';
import { PointPresenter, SortingPresenter } from '../../presenter';
import Store from '../../store/store';
import { filterPoints, sortPoints } from '../../utils';

export default class RoutePresenter {
  #appStore = Store.getInstance();
  #pointListView = new PointListView();
  #noPointsView = null;
  #container = null;
  #pointPresenters = new Map();
  #sortingPresenter = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container - HTML container
   */
  constructor(container) {
    this.#container = container;

    this.#appStore.addObserver(this.#changeStoreHandler);
    this.#sortingPresenter = new SortingPresenter(this.#container);
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
    this.#sortingPresenter.init();
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
    this.#sortingPresenter.destroy();
    remove(this.#pointListView);
    remove(this.#noPointsView);
  }

  /**
   * Change point's view mode handler
   */
  #changeViewModeHandler = () => { // TODO: refactor to store
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * Change model handler
   */
  #changeStoreHandler = () => {
    this.#clearRoute();
    this.#renderRoute();
  };
}
