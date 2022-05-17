import { remove, render } from '../../framework/render';
import { NoPointsView, PointListView } from '../../view';
import { NoPointsMessage } from '../../const';
import { PointPresenter, SortingPresenter, AbstractPresenter } from '../../presenter';
import { filterPoints, sortPoints } from '../../utils';
import Store from '../../store/store';

export default class RoutePresenter extends AbstractPresenter {
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
    super();

    this.#container = container;
    this._appStore.addObserver(this.#changeStoreHandler);
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
    const {points} = this._appStore.state;
    if (points.length > 0) {
      this.#renderSorting();
      this.#renderPoints();
    } else {
      this.#renderNoPoints();
    }
  }

  /**
   * Renders list of points
   */
  #renderPoints() {
    const {points, filter, sorting} = this._appStore.state;
    render(this.#pointListView, this.#container);
    for (const point of sortPoints(filterPoints(points, filter), sorting)) {
      const pointPresenter = new PointPresenter(this.#pointListView.element);
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
    const {filter} = this._appStore.state;
    this.#noPointsView = new NoPointsView(NoPointsMessage[filter]);
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
   * Change store handler
   * @param {String} event - event
   */
  #changeStoreHandler = (event) => {
    switch (event) {
      case Store.FILTER_CHANGE:
      case Store.SORTING_CHANGE:
      case Store.POINT_UPDATE:
        this.#clearRoute();
        this.#renderRoute();
        break;
    }
  };
}
