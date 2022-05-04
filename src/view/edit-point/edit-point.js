import AbstractView from '../abstract-view/abstract-view';
import { createEditPointTemplate } from './create-edit-point-template';

export default class EditPointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;

  /**
   * Creates an instance of view
   * @param {Point} point - point data
   * @param {Array<Destination>} destinations - available destinations
   * @param {Array<Offer>} offers - available offers
   */
  constructor(point, offers, destinations) {
    super();

    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return createEditPointTemplate(this.#point, this.#offers, this.#destinations);
  }
}
