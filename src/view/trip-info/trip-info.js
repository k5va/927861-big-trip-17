import AbstractView from '../../framework/view/abstract-view';
import { createTripInfoTemplate } from './create-trip-info-template';

const DEFAULT_COST = 0;

export default class TripInfoView extends AbstractView {
  #destinations = [];
  #startDate = null;
  #endDate = null;
  #cost = DEFAULT_COST;

  /**
   * Creates new instance of view
   * @param {Array<String>} destinations - array of trip's destinations
   * @param {Date} startDate - trip's start date
   * @param {Date} endDate - trip's end date
   * @param {Number} cost - trip's cost
   */
  constructor(destinations, startDate, endDate, cost) {
    super();

    this.#destinations = destinations;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#cost = cost;
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createTripInfoTemplate(this.#destinations, this.#startDate, this.#endDate, this.#cost);
  }
}
