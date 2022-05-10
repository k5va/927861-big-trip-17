import { Filter, DEFAULT_FILTER } from '../../const';
import Observable from '../../framework/observable';
import { isCurrentPoint, isFuturePoint, isPastPoint } from '../../utils';

export default class Route extends Observable {
  #points = [];
  #filter = DEFAULT_FILTER;

  /**
   * points getter
   * @returns {Array<Point>} - array of points
   */
  get points() {
    return this.#filterPoints();
  }

  /**
   * points setter
   * @param {Array<Point>} points - array of points
   */
  set points(points) {
    this.#points = [...points];
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
    this._notify('filter_change', this.#filter);
  }

  /**
   * filters points
   * @returns {Array<Point>} - points array
   */
  #filterPoints() {
    switch (this.#filter) {
      case Filter.EVERYTHING:
        return [...this.#points];
      case Filter.FUTURE:
        return this.#points.filter((point) => isFuturePoint(point) || isCurrentPoint(point));
      case Filter.PAST:
        return this.#points.filter((point) => isPastPoint(point) || isCurrentPoint(point));
      default:
        throw new Error('Unsupported filter');
    }
  }
}
