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
    const {filter} = this.#appStore.state;
    this.#filterView = new FiltersView(filter, Object.values(Filter), this.#generateDisabledFilters());
    this.#filterView.setChangeHandler(this.#changeFilterHandler);
    render(this.#filterView, this.#container);
  }

  /**
   * Change filter handler
   * @param {String} newFilter - selected filter
   */
  #changeFilterHandler = (newFilter) => {
    const {filter} = this.#appStore.state;
    if (newFilter !== filter) {
      this.#appStore.dispatch(Store.FILTER_CHANGE, newFilter);
    }
  };

  /**
   * Generates array of disabled filters
   * @returns {Array<String>} - array of disabled filters
   */
  #generateDisabledFilters() {
    const {points} = this.#appStore.state;
    return Object
      .values(Filter)
      .filter((filter) => PointFilter[filter](points).length === 0);
  }
}
