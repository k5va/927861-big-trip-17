import AbstractView from '../abstract-view/abstract-view';
import { createPointListTemplate } from './create-point-list-template';

export default class PointListView extends AbstractView {

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return createPointListTemplate();
  }
}
