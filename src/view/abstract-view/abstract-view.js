import { createElement } from '../../render';

export default class AbstractView {
  #element = null;

  /**
   * View's constructor
   */
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }

  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  /**
   * Returns view's html element
   * @returns {Element} - view's html element
   */
  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  /**
   * Removes view's html element
   */
  removeElement() {
    this.#element = null;
  }
}
