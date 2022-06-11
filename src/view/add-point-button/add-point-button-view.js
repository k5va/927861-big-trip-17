import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { createAddPointButtonTemplate } from './create-add-point-button-template';

export default class AddPointButtonView extends AbstractStatefulView {

  /**
   * Creates new instance of view
   */
  constructor(isEnabled = false) {
    super();

    this._state = {isEnabled};
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createAddPointButtonTemplate(this._state);
  }

  /**
   * Enables or disables create button
   * @param {Boolean} isEnabled - is button enabled
   */
  enable(isEnabled = true) {
    this.updateElement({isEnabled});
  }

  /**
   * Sets add point button click handler
   * @param {Function} handler - click handler
   */
  setClickHandler(handler) {
    this._callback.click = handler;
    this.element.addEventListener('click', this.#clickHandler);
  }

  /**
   * Click handler
   * @param {Event} evt - event object
   */
  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click?.();
  };

  /**
   * Restores all handlers
   */
  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
  };
}
