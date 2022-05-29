import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { Filter, PointFilter } from '../../const';
import { AbstractPresenter } from '../../presenter';
import { Actions } from '../../store';

export default class FilterPresenter extends AbstractPresenter {
  #filtersView = null;
  #container = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container - DOM container
   * @param {Store} store - store
   */
  constructor(container, store) {
    super(store);

    this.#container = container;
    this._appStore.addObserver(this.#changeStoreHandler);
  }

  /**
   * Renders filter
   */
  init() {
    const {filter} = this._appStore.state;
    this.#filtersView = new FiltersView(filter, Object.values(Filter), this.#generateDisabledFilters());
    this.#filtersView.setChangeHandler(this.#changeFilterHandler);
    render(this.#filtersView, this.#container);
  }

  /**
   * Change filter handler
   * @param {String} newFilter - selected filter
   */
  #changeFilterHandler = (newFilter) => {
    const {filter} = this._appStore.state;
    if (newFilter !== filter) {
      this._appStore.dispatch(Actions.FILTER_CHANGE, newFilter);
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

  /**
   * Change store handler
   * @param {String} event - event
   */
  #changeStoreHandler = (event) => {
    switch (event) {
      case Actions.POINT_UPDATE:
      case Actions.POINT_DELETE:
      case Actions.POINT_ADD:
      case Actions.DATA_LOADED:
        this.#filtersView.updateElement({disabled: this.#generateDisabledFilters()});
        break;
    }
  };
}
