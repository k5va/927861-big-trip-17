import { DEFAULT_FILTER, DEFAULT_SORTING } from '../const';
import Observable from '../framework/observable';

export default class Store extends Observable {

  static FILTER_CHANGE = 'FILTER_CHANGE';
  static SORTING_CHANGE = 'SORTING_CHANGE';

  #points = [];
  #offers = {};
  #destinations = [];
  #filter = DEFAULT_FILTER;
  #sorting = DEFAULT_SORTING;

  /**
   * Creates an instamce of Store
   * @param {Array<Point>} points - points data
   * @param {Object} offers - offers data
   * @param {Array<Destination>} destinations - destinations data
   */
  constructor(points, offers, destinations) {
    super();

    if (!Store._instance) {
      Store._instance = this;
    }

    this.#points = [...points];
    this.#offers = {...offers};
    this.#destinations = [...destinations];

    return Store._instance;
  }

  /**
   * Initializes Store
   * @param {Array<Point>} points - points data
   * @param {Object} offers - offers data
   * @param {Array<Destination>} destinations - destinations data
   */
  static init(points, offers, destinations) {
    return new Store(points, offers, destinations);
  }

  /**
   * Returns single store instance
   * @returns {Store} - instance
   */
  static getInstance() {
    return Store._instance;
  }

  /**
   * points getter
   * @returns {Array<Point>} - array of points
   */
  get points() {
    return [...this.#points];
  }

  /**
   * points setter
   * @param {Array<Point>} points - array of points
   */
  set points(points) {
    this.#points = [...points];
  }

  /**
   * Updates given point
   * @param {Point} updatedPoint - point data
   */
  updatePoint(updatedPoint) {
    const index = this.#points.findIndex(({id}) => id === updatedPoint.id);
    if (index === -1) {
      throw new Error (`No such point in model ${updatedPoint.id}`);
    }

    this.#points = [...this.#points.slice(0, index), updatedPoint, ...this.#points.slice(index + 1)];
  }

  /**
   * Returns offers of given type
   * @param {String} type - offer type
   * @param {Array<String>} - ids
   * @returns {Array<Offer>} - array of offers
   */
  getOffers(type, ids) {
    const typeOffers = this.#offers[type] ? [...this.#offers[type]] : [];
    if (ids) {
      return typeOffers.filter((offer) => ids.some((id) => id === offer.id));
    }

    return typeOffers;
  }

  get destinations() {
    return [...this.#destinations];
  }

  /**
   * filter getter
   */
  get filter() {
    return this.#filter;
  }

  /**
   * filter setter
   * @param {String} filter - new filter
   */
  set filter(filter) {
    this.#filter = filter;
    this.#sorting = DEFAULT_SORTING;
    this._notify(Store.FILTER_CHANGE, this.#filter);
  }

  /**
   * Sorting getter
   */
  get sorting() {
    return this.#sorting;
  }

  /**
   * Sorting setter
   * @param {String} sorting - new sorting
   */
  set sorting(sorting) {
    if (this.#sorting !== sorting) {
      this.#sorting = sorting;
      this._notify(Store.SORTING_CHANGE, this.#sorting);
    }
  }
}
