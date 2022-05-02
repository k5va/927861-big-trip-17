import AbstractView from '../abstract-view/abstract-view';
import { template } from './template';

export default class EditPointView extends AbstractView {

  /**
   * Creates an instance of view
   * @param {Point} point - point data
   * @param {Array<Destination>} destinations - available destinations
   * @param {Array<Offer>} offers - available offers
   */
  constructor(point, offers, destinations) {
    super();

    this._point = point;
    this._offers = offers;
    this._destinations = destinations;
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  getTemplate() {
    return template(this._point, this._offers, this._destinations);
  }
}
