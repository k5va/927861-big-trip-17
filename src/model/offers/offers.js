import { Offer } from '../../model';

export default class Offers {
  _offers = {};

  /**
   * Returns offers of given type
   * @param {String} type - offer type
   * @param {Array<String>} - ids
   * @returns {Array<Offer>} - array of offers
   */
  getOffers(type, ids) {
    const typeOffers = this._offers[type] ? [...this._offers[type]] : [];
    if (ids) {
      return typeOffers.filter((offer) => ids.some((id) => id === offer.id));
    }

    return typeOffers;
  }

  /**
   * Sets ofeers of given type
   * @param {String} type - offer type
   * @param {Array<Offer>} offers - array of offers
   */
  setOffers(type, offers) {
    this._offers[type] = [...offers];
  }

  /**
   * Creates offers model from raw data
   * @param {Object} data - raw data
   * @returns {<Offers} - offers
   */
  static parse(data) {
    const offersModel = new Offers();
    data.forEach(({type, offers}) => offersModel.setOffers(
      type,
      offers.map(Offer.parse))
    );

    return offersModel;
  }
}
