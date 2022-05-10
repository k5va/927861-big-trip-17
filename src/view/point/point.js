import AbstractView from '../../framework/view/abstract-view';
import { createPointTemplate } from './create-point-template';

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #editButtonElement = null;

  /**
   * Creates an instance of point view
   * @param {Point} point - point
   * @param {Array<Offer>} offers - offers
   */
  constructor(point, offers) {
    super();

    this.#point = point;
    this.#offers = offers;

    this.#editButtonElement = this.element.querySelector('.event__rollup-btn');
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createPointTemplate(this.#point, this.#offers);
  }

  /**
   * Sets edit point handler
   * @param {Function} handler - handler
   */
  setEditHandler(handler) {
    this._callback.edit = handler;
    this.#editButtonElement.addEventListener('click', this.#editHandler);
  }

  /**
   * Handler for edit point
   * @param {Event} evt - event object
   */
  #editHandler = (evt) => {
    evt.preventDefault();
    this._callback.edit?.();
  };
}
