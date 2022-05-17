import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { Filter, PointFilter } from '../../const';
import Store from '../../store/store';

export default class FilterPresenter {
  #appStore = Store.getInstance();
  #filterView = null;
  #container = null;

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
      this.#generateDisabledFilters()
    );
    this.#filterView.setChangeHandler(this.#changeFilterHandler);
    render(this.#filterView, this.#container);
  }

  /**
   * Change filter handler
   * @param {String} filter - selected filter
   */
  #changeFilterHandler = (filter) => {
    this.#appStore.dispatch(Store.FILTER_CHANGE, filter);
  };

  /**
   * Generates array of disabled filters
   * @returns {Array<String>} - array of disabled filters
   */
  #generateDisabledFilters() {
    return Object
      .values(Filter)
      .filter((filter) => PointFilter[filter](this.#appStore.points).length === 0);
  }
}
