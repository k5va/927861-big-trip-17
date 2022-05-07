import AbstractView from '../../framework/view/abstract-view';
import { createPointListTemplate } from './create-point-list-template';

export default class PointListView extends AbstractView {

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createPointListTemplate();
  }
}
