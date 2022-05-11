import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { Filter, DEFAULT_FILTER } from '../../const';

export default class FilterPresenter {
  #filterView = new FiltersView(Object.values(Filter), DEFAULT_FILTER);
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
}
