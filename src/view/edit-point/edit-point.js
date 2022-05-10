import AbstractView from '../../framework/view/abstract-view';
import { createEditPointTemplate } from './create-edit-point-template';

export default class EditPointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #formElement = null;
  #closeButtonElement = null;

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

    this.#formElement = this.element.querySelector('.event--edit');
    this.#closeButtonElement = this.element.querySelector('.event__rollup-btn');
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createEditPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  /**
   * Sets save point handler
   * @param {Function} handler - handler
   */
  setSaveHandler(handler) {
    this._callback.save = handler;
    this.#formElement.addEventListener('submit', this.#saveHandler);
  }

  /**
   * Handler for edit point
   * @param {Event} evt - event object
   */
  #saveHandler = (evt) => {
    evt.preventDefault();
    this._callback.save?.();
  };

  /**
   * Sets close handler
   * @param {Function} handler - handler
   */
  setCloseHandler(handler) {
    this._callback.close = handler;
    this.#closeButtonElement.addEventListener('click', this.#closeHandler);
  }

  /**
   * Handler for close
   * @param {Event} evt - event object
   */
  #closeHandler = (evt) => {
    evt.preventDefault();
    this._callback.close?.();
  };


  /**
   * Activates view (when is visible to user)
   */
  activate() {
    document.addEventListener('keydown', this.#keydownHandler);
  }

  /**
   * Deactivates view (when is not visible to user)
   */
  deactivate() {
    document.removeEventListener('keydown', this.#keydownHandler);
  }

  /**
   * Handler for document key down event
   * @param {KeyboardEvent} evt - event object
   */
  #keydownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      this._callback.close?.();
    }
  };
}
