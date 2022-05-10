import AbstractView from '../../framework/view/abstract-view';
import { createFiltersTemplate } from './create-filters-template';

export default class FiltersView extends AbstractView {
  #filters = null;

  /**
   * Creates new instance of view
   * @param {Array<String>} filters - array of available filters
   */
  constructor(filters) {
    super();

    this.#filters = filters;
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
