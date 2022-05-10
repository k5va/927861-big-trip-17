import { render } from '../../framework/render';
import { FiltersView } from '../../view';
import { Filter } from '../../const';


export default class FilterPresenter {
  #filterView = new FiltersView(Object.values(Filter));
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
    render(this.#filterView, this.#container);
  }
}
