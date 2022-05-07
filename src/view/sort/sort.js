import AbstractView from '../../framework/view/abstract-view';
import { template } from './template';

export default class SortView extends AbstractView {
  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return template;
  }
}
