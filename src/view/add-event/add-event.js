import AbstractView from '../abstract-view/abstract-view';
import { template } from './template';

export default class AddEventView extends AbstractView {

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return template();
  }
}
