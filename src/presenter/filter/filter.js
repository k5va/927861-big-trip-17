import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { Filter, PointFilter } from '../../const';

export default class FilterPresenter {
  #filterView = null;
  #container = null;
  #routeModel = null;

  /**
   * Creates new instance of presenter
   * @param {Route} routeModel - route data
   * @param {HTMLElement} container
   */
  constructor(container, routeModel) {
    this.#container = container;
    this.#routeModel = routeModel;
  }

  /**
   * Renders filter
   */
  init() {
    this.#filterView = new FiltersView(this.#routeModel.filter, Object.values(Filter),
      this.#generateDisabledFilters(this.#routeModel.points)
    );
    this.#filterView.setChangeHandler(this.#changeFilterHandler);
    render(this.#filterView, this.#container);
  }

  /**
   * Change filter handler
   * @param {String} filter - selected filter
   */
  #changeFilterHandler = (filter) => {
    this.#routeModel.filter = filter;
  };

  /**
   * Generates array of disabled filters
   * @param {Array<Point>} points - array of points
   * @returns {Array<String>} - array of disabled filters
   */
  #generateDisabledFilters(points) {
    return Object.values(Filter).filter((filter) => PointFilter[filter](points).length === 0);
  }
}
