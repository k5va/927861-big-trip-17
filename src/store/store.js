import { DEFAULT_FILTER, DEFAULT_SORTING } from '../const';
import { updatePoint } from '../utils';
import Observable from '../framework/observable';

export default class Store extends Observable {

  static FILTER_CHANGE = 'FILTER_CHANGE';
  static SORTING_CHANGE = 'SORTING_CHANGE';
  static POINT_UPDATE = 'POINT_UPDATE';

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

  get destinations() {
    return [...this.#destinations];
  }

  get offers() {
    return {...this.#offers};
  }

  /**
   * filter getter
   */
  get filter() {
    return this.#filter;
  }

  /**
   * Sorting getter
   */
  get sorting() {
    return this.#sorting;
  }

  dispatch(event, payload) {
    switch (event) {
      case Store.FILTER_CHANGE:
        if (this.#filter !== payload) {
          this.#filter = payload;
          this.#sorting = DEFAULT_SORTING;
          this._notify(Store.FILTER_CHANGE, this.#filter);
        }
        break;
      case Store.SORTING_CHANGE:
        if (this.#sorting !== payload) {
          this.#sorting = payload;
          this._notify(Store.SORTING_CHANGE, this.#sorting);
        }
        break;
      case Store.POINT_UPDATE:
        this.#points = updatePoint(payload, this.#points);
        this._notify(Store.POINT_UPDATE, payload);
        break;
    }
  }
}
