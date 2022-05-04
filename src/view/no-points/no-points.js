import AbstractView from '../abstract-view/abstract-view';
import { createNoPointsTemplate } from './create-no-points-template';

export default class NoPointsView extends AbstractView {
  #message = null;

  /**
   * Creates an instance of view
   * @param {String} message - message to display
   */
  constructor(message) {
    super();

    this.#message = message;
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return createNoPointsTemplate(this.#message);
  }
}
