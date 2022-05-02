import AbstractView from '../abstract-view/abstract-view';
import { createAddPointButtonTemplate } from './create-add-point-button-template';

export default class AddPointButtonView extends AbstractView {

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return createAddPointButtonTemplate();
  }
}
