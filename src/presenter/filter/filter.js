import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { Filter, PointFilter } from '../../const';
import Store from '../../store/store';
import { AbstractPresenter } from '../../presenter';

export default class FilterPresenter extends AbstractPresenter {
  #filterView = null;
  #container = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container
   */
  constructor(container) {
    super();

    this.#container = container;
  }

  /**
   * Renders filter
   */
  init() {
    const {filter} = this._appStore.state;
    this.#filterView = new FiltersView(filter, Object.values(Filter), this.#generateDisabledFilters());
    this.#filterView.setChangeHandler(this.#changeFilterHandler);
    render(this.#filterView, this.#container);
  }

  /**
   * Change filter handler
   * @param {String} newFilter - selected filter
   */
  #changeFilterHandler = (newFilter) => {
    const {filter} = this._appStore.state;
    if (newFilter !== filter) {
      this._appStore.dispatch(Store.FILTER_CHANGE, newFilter);
    }
  };

  /**
   * Generates array of disabled filters
   * @returns {Array<String>} - array of disabled filters
   */
  #generateDisabledFilters() {
    const {points} = this._appStore.state;
    return Object
      .values(Filter)
      .filter((filter) => PointFilter[filter](points).length === 0);
  }
}
