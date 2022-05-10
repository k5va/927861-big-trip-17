import AbstractView from '../../framework/view/abstract-view';
import { createFiltersTemplate } from './create-filters-template';

export default class FiltersView extends AbstractView {
  #filters = null;
  #activeFilter = null;
  #filtersForm = null;

  /**
   * Creates new instance of view
   * @param {Array<String>} filters - array of available filters
   * @param {String} activeFilter - active filter
   */
  constructor(filters, activeFilter) {
    super();

    this.#filters = filters;
    this.#activeFilter = activeFilter;
    this.#filtersForm = this.element.querySelector('.trip-filters');
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createFiltersTemplate(this.#filters, this.#activeFilter);
  }

  /**
   * Sets change filter handler
   * @param {Function} handler - handler
   */
  setChangeHandler(handler) {
    this._callback.change = handler;
    this.#filtersForm.addEventListener('change', this.#changeHandler);
  }

  /**
   * Change filter handler
   * @param {Event} evt - event object
   */
  #changeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('trip-filters__filter-input')) {
      this._callback.change?.(evt.target.value);
    }
  };
}
