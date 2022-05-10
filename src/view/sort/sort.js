import AbstractView from '../../framework/view/abstract-view';
import { createSortTemplate } from './create-sort-template';

export default class SortView extends AbstractView {
  #sortings = null;
  #disabled = null;
  #activeSorting = null;
  #sortingsForm = null;

  /**
   * Creates new instance of view
   * @param {String} activeSorting - active sortings
   * @param {Array<String>} sortings - array of available sortings
   * @param {Array<String>} disabled - array of dsabled sortings
   */
  constructor(activeSorting, sortings, disabled) {
    super();

    this.#sortings = sortings;
    this.#activeSorting = activeSorting;
    this.#disabled = disabled;
    this.#sortingsForm = this.element.querySelector('.trip-events__trip-sort');
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createSortTemplate(this.#activeSorting, this.#sortings, this.#disabled);
  }

  /**
   * Sets change sorting handler
   * @param {Function} handler - handler
   */
  setChangeHandler(handler) {
    this._callback.change = handler;
    this.#sortingsForm.addEventListener('change', this.#changeHandler);
  }

  /**
   * Change sorting handler
   * @param {Event} evt - event object
   */
  #changeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('trip-sort__input')) {
      this._callback.change?.(evt.target.value);
    }
  };
}
