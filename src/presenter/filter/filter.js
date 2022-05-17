import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { Filter, PointFilter } from '../../const';
import Store from '../../store/store';

export default class FilterPresenter {
  #filterView = null;
  #container = null;
  #appStore = Store.getInstance();

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.#container = container;
  }

  /**
   * Renders filter
   */
  init() {
    this.#filterView = new FiltersView(this.#appStore.filter, Object.values(Filter),
      this.#generateDisabledFilters(this.#appStore.points) //FIXME: get all points!!! Same to sorting!
    );
    this.#filterView.setChangeHandler(this.#changeFilterHandler);
    render(this.#filterView, this.#container);
  }

  /**
   * Change filter handler
   * @param {String} filter - selected filter
   */
  #changeFilterHandler = (filter) => {
    this.#appStore.filter = filter;
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
