import AbstractView from '../abstract-view/abstract-view';
import { createAddPointTemplate } from './create-add-point-template';

export default class AddPointView extends AbstractView {

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return createAddPointTemplate();
  }
}
