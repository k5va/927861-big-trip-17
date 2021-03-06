import { remove, render } from '../../framework/render';
import { NoPointsView, PointListView, AddPointButtonView } from '../../view';
import { AppMode, DEFAULT_FILTER, NoPointsMessage } from '../../const';
import { AddPointPresenter, FilterPresenter, PointPresenter,
  SortingPresenter, TripInfoPresenter } from '../../presenter';
import AbstractPresenter from '../presenter/abstract-presenter';
import { filterPoints, sortPoints } from '../../utils';
import { Actions } from '../../store';

export default class RoutePresenter extends AbstractPresenter {
  #pointListView = new PointListView();
  #noPointsView = null;
  #routeContainer = null;
  #headContainer = null;
  #pointPresenters = new Map();
  #sortingPresenter = null;
  #addPointButtonView = new AddPointButtonView();
  #filterPresenter = null;
  #tripInfoPresenter = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} routeContainer - HTML container
   * @param {HTMLElement} headContainer - HTML container
   */
  constructor(routeContainer, headContainer) {
    super();

    this.#routeContainer = routeContainer;
    this.#headContainer = headContainer;

    this._appStore.addObserver(this.#changeStoreHandler);

    this.#tripInfoPresenter = new TripInfoPresenter(headContainer);
    this.#filterPresenter = new FilterPresenter(headContainer);
    this.#sortingPresenter = new SortingPresenter(this.#routeContainer);
  }

  /**
   * Renders points
   */
  init() {
    this.#tripInfoPresenter.init();
    this.#filterPresenter.init();
    render(this.#addPointButtonView, this.#headContainer);
    this.#addPointButtonView.setClickHandler(this.#addNewPointHandler);

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
    render(this.#pointListView, this.#routeContainer);
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
    render(this.#noPointsView, this.#routeContainer);
  }

  /**
   * Renders Loading message
   */
  #renderLoading() {
    this.#noPointsView = new NoPointsView(NoPointsMessage.LOADING);
    render(this.#noPointsView, this.#routeContainer);
  }

  /**
   * Renders error message
   */
  #renderError() {
    this.#noPointsView = new NoPointsView(NoPointsMessage.ERROR);
    render(this.#noPointsView, this.#routeContainer);
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
  #changeStoreHandler = (event, payload) => {
    switch (event) {
      case Actions.FILTER_CHANGE:
      case Actions.SORTING_CHANGE:
      case Actions.POINT_UPDATE:
      case Actions.POINT_DELETE:
      case Actions.POINT_ADD:
        this.#clearRoute();
        this.#renderRoute();
        break;
      case Actions.DATA_LOADED:
        this.#addPointButtonView.enable();
        this.#clearRoute();
        this.#renderRoute();
        break;
      case Actions.DATA_ERROR:
        this.#clearRoute();
        this.#renderError();
        break;
      case Actions.MODE_CHANGE:
        this.#handleChangeMode(payload);
        break;
    }
  };

  #handleChangeMode(mode) {
    switch (mode) {
      case AppMode.READY:
      case AppMode.EDIT_POINT:
        this.#addPointButtonView.enable();
        break;
      case AppMode.ADD_POINT:
        this.#addPointButtonView.enable(false);
        break;
    }
  }

  /**
   * Handles add new point
   */
  #addNewPointHandler = () => {
    this._appStore.dispatch(Actions.FILTER_CHANGE, DEFAULT_FILTER);
    const addPointPresenter = new AddPointPresenter(this.#pointListView.element);
    addPointPresenter.init();
  };
}
