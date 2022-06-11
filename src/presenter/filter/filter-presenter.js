import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { AppMode, Filter, PointFilter } from '../../const';
import { AbstractPresenter } from '..';
import { Actions } from '../../store';

export default class FilterPresenter extends AbstractPresenter {
  #filtersView = null;
  #container = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container - DOM container
   */
  constructor(container) {
    super();

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
  #changeStoreHandler = (event, payload) => {
    switch (event) {
      case Actions.POINT_UPDATE:
      case Actions.POINT_DELETE:
      case Actions.POINT_ADD:
      case Actions.DATA_LOADED:
        this.#filtersView.updateElement({disabled: this.#generateDisabledFilters()});
        break;
      case Actions.FILTER_CHANGE:
        this.#filtersView.updateElement({activeFilter: payload});
        break;
      case Actions.MODE_CHANGE:
        this.#handleChangeMode(payload);
        break;
    }
  };

  #handleChangeMode(mode) {
    switch (mode) {
      case AppMode.READY:
        this.#filtersView.updateElement({disabled: this.#generateDisabledFilters()});
        break;
      case AppMode.EDIT_POINT:
      case AppMode.ADD_POINT:
        this.#filtersView.updateElement({disabled: Object.values(Filter)});
        break;
    }
  }
}
