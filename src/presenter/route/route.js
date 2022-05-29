import { remove, render } from '../../framework/render';
import { NoPointsView, PointListView } from '../../view';
import { AppMode, NoPointsMessage } from '../../const';
import { PointPresenter, SortingPresenter, AbstractPresenter } from '../../presenter';
import { filterPoints, sortPoints } from '../../utils';
import { Actions } from '../../store';

export default class RoutePresenter extends AbstractPresenter {
  #pointListView = new PointListView();
  #noPointsView = null;
  #container = null;
  #pointPresenters = new Map();
  #sortingPresenter = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container - HTML container
   * @param {Store} store - store
   */
  constructor(container, store) {
    super(store);

    this.#container = container;
    this._appStore.addObserver(this.#changeStoreHandler);
    this.#sortingPresenter = new SortingPresenter(this.#container, this._appStore);
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
    const {points, mode} = this._appStore.state;

    if (mode === AppMode.PENDING) {
      this.#renderLoading();
      return;
    }

    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSorting();
    this.#renderPoints();
  }

  /**
   * Renders list of points
   */
  #renderPoints() {
    const {points, filter, sorting} = this._appStore.state;
    render(this.#pointListView, this.#container);
    for (const point of sortPoints(filterPoints(points, filter), sorting)) {
      const pointPresenter = new PointPresenter(this.#pointListView.element, this._appStore);
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
   * Renders Loading message
   */
  #renderLoading() {
    this.#noPointsView = new NoPointsView(NoPointsMessage.LOADING); //TODO: disable create button
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
      case Actions.FILTER_CHANGE:
      case Actions.SORTING_CHANGE:
      case Actions.POINT_UPDATE:
      case Actions.POINT_DELETE:
      case Actions.DATA_LOADED:
        this.#clearRoute();
        this.#renderRoute();
        break;
    }
  };
}
