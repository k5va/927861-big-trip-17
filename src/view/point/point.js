import AbstractView from '../abstract-view/abstract-view';
import { template } from './template';

export default class PointView extends AbstractView {

  /**
   * Creates an instance of point view
   * @param {Point} point - point
   * @param {Array<Offer>} - offers
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
