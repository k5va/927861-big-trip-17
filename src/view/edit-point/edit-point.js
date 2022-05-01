import AbstractView from '../abstract-view/abstract-view';
import { template } from './template';

export default class EditPointView extends AbstractView {

  /**
   * Creates an instance of view
   * @param {Point} point - point data
   * @param {Array<Offer>} offers - offers
   */
  constructor(point, offers) {
    super();

    this._point = point;
    this._offers = offers;
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return template(this._point, this._offers);
  }
}
