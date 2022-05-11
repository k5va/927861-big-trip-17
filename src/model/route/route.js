import { PointFilter, DEFAULT_FILTER, DEFAULT_SORTING, Sorting } from '../../const';
import Observable from '../../framework/observable';
import { comparePointsByDay, comparePointsByPrice, comparePointsByTime } from '../../utils';

export default class Route extends Observable {
  #points = [];
  #filter = DEFAULT_FILTER;
  #sorting = DEFAULT_SORTING;

  /**
   * points getter
   * @returns {Array<Point>} - array of points
   */
  get points() {
    return this.#sortPoints(this.#filterPoints(this.#points));
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
    this.#sorting = DEFAULT_SORTING;
    this._notify('filter_change', this.#filter);
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
    this.#sorting = sorting;
    this._notify('sorting_change', this.#sorting);
  }

  /**
   * filters points
   * @param {Array<Point>} points - points
   * @returns {Array<Point>} - points array
   */
  #filterPoints(points) {
    return PointFilter[this.#filter](points);
  }

  /**
   * Sorts points
   * @param {Array<Point>} points - points
   * @returns {Array<Point>} - points array
   */
  #sortPoints(points) {
    switch (this.#sorting) {
      case Sorting.DAY:
        return [...points].sort(comparePointsByDay);
      case Sorting.PRICE:
        return [...points].sort(comparePointsByPrice);
      case Sorting.TIME:
        return [...points.sort(comparePointsByTime)];
      default:
        throw new Error('Unsupported sorting');
    }
  }
}
