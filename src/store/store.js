import { DEFAULT_FILTER, DEFAULT_SORTING } from '../const';
import { updatePoint } from '../utils';
import Observable from '../framework/observable';

export default class Store extends Observable {

  static FILTER_CHANGE = 'FILTER_CHANGE';
  static SORTING_CHANGE = 'SORTING_CHANGE';
  static POINT_UPDATE = 'POINT_UPDATE';

  #state = {
    points: [],
    offers: {},
    destinations: [],
    filter: DEFAULT_FILTER,
    sorting: DEFAULT_SORTING,
  };

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

    this.#state = {
      ...this.#state,
      points: [...points],
      offers: {...offers},
      destinations: [...destinations]
    };

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
  get state() {
    return {...this.#state};
  }

  /**
   * Dispatches events to store and modifies it
   * @param {String} event - event type
   * @param {Object} payload - payload
   */
  dispatch(event, payload) {
    const {points} = this.#state;
    switch (event) {
      case Store.FILTER_CHANGE:
        this.#state = {...this.#state, filter: payload, sorting: DEFAULT_SORTING};
        break;
      case Store.SORTING_CHANGE:
        this.#state = {...this.#state, sorting: payload};
        break;
      case Store.POINT_UPDATE:
        this.#state = {...this.#state, points: updatePoint(payload, points)};
        break;
      default:
        throw new Error(`Unknown event dispatched to store ${event}`);
    }

    this._notify(event, payload);
  }
}
