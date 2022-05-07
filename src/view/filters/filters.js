import AbstractView from '../../framework/view/abstract-view';
import { createFiltersTemplate } from './create-filters-template';

export default class FiltersView extends AbstractView {

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createFiltersTemplate();
  }
}
