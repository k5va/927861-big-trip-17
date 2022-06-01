import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { createFiltersTemplate } from './create-filters-template';

export default class FiltersView extends AbstractStatefulView {

  /**
   * Creates new instance of view
   * @param {String} activeFilter - active filter
   * @param {Array<String>} filters - array of available filters
   * @param {Array<String>} disabled - array of disabled filters
   */
  constructor(activeFilter, filters, disabled) {
    super();

    this._state = {activeFilter, filters, disabled};
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createFiltersTemplate(this._state);
  }

  /**
   * Sets change filter handler
   * @param {Function} handler - handler
   */
  setChangeHandler(handler) {
    this._callback.change = handler;
    this.element.querySelector('.trip-filters').addEventListener('change', this.#changeHandler);
  }

  /**
   * Change filter handler
   * @param {Event} evt - event object
   */
  #changeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('trip-filters__filter-input')) {
      this._setState({activeFilter: evt.target.value});
      this._callback.change?.(evt.target.value);
    }
  };

  /**
   * Restores all handlers
   */
  _restoreHandlers = () => {
    this.setChangeHandler(this._callback.change);
  };
}
