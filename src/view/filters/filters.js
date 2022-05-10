import AbstractView from '../../framework/view/abstract-view';
import { createFiltersTemplate } from './create-filters-template';

export default class FiltersView extends AbstractView {
  #filters = null;
  #activeFilter = null;

  /**
   * Creates new instance of view
   * @param {Array<String>} filters - array of available filters
   * @param {String} activeFilter - active filter
   */
  constructor(filters, activeFilter) {
    super();

    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createFiltersTemplate(this.#filters, this.#activeFilter);
  }
}
