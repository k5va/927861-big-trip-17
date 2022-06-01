import { render, replace } from '../../framework/render';
import { TripInfoView } from '../../view';
import { AbstractPresenter } from '../../presenter';
import { Actions } from '../../store';
import { filterOffers, sortPoints } from '../../utils';

export default class TripInfoPresenter extends AbstractPresenter {
  #tripInfoView = null;
  #container = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container - DOM container
   */
  constructor(container) {
    super();

    this.#container = container;
    this._appStore.addObserver(this.#changeStoreHandler);
  }

  /**
   * Renders filter
   */
  init() {
    this.#updateView();
  }

  /**
   * Change store handler
   * @param {String} event - event
   */
  #changeStoreHandler = (event) => {
    switch (event) {
      case Actions.POINT_UPDATE:
      case Actions.POINT_DELETE:
      case Actions.POINT_ADD:
      case Actions.DATA_LOADED:
        this.#updateView();
        break;
    }
  };

  /**
   * Updates trip info view
   */
  #updateView() {
    const prevTripInfoView = this.#tripInfoView;
    const points = sortPoints(this._appStore.state.points);
    this.#tripInfoView = new TripInfoView(
      this.#generateDestinations(points),
      this.#calculateStartDate(points),
      this.#calculateEndDate(points),
      this.#calculateCost(points)
    );
    if (prevTripInfoView) {
      replace(this.#tripInfoView, prevTripInfoView);
    } else {
      render(this.#tripInfoView, this.#container);
    }
  }

  /**
   * Generates array of points' destinations
   * @param {Array<Point>} points - array of sorted by day points
   * @returns {Array<String>} - array of destinations
   */
  #generateDestinations(points) {
    return points.map(({destination}) => destination);
  }

  /**
   * Calculates trip's total cost
   * @param {Array<Point>} points - array of points
   * @returns {Number} - total cost
   */
  #calculateCost(points) {
    let cost = 0;
    for (const {type, bestPrice, offers} of points) {
      cost += bestPrice + filterOffers(this._appStore.state.offers, type, offers)
        .reduce(((sum, {price}) => sum + price), 0);
    }

    return cost;
  }

  /**
   * Calculate trip's start date
   * @param {Array<Point>} points - array of sorted by day points
   * @returns {Date} - start date
   */
  #calculateStartDate(points) {
    return points[0]?.dateFrom;
  }

  /**
   * Calculate trip's end date
   * @param {Array<Point>} points - array of sorted by day points
   * @returns {Date} - end date
   */
  #calculateEndDate(points) {
    return points.at(-1)?.dateTo;
  }
}
