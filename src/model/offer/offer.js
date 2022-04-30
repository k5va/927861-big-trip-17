export default class Offer {

  /**
   * Creates new instance of offer
   * @param {Object} data - raw data
   */
  constructor(data) {
    this.id = String(data['id']);
    this.title = data['title'];
    this.price = Number(data['price']);
    this.type = data['type'];
  }

  /**
   * Creates new offer from raw data
   * @param {Object} data - raw data
   * @returns {Offer} - offer
   */
  static parse(data) {
    return new Offer(data);
  }

  /**
   * Creates offers array from raw data
   * @param {Array<Object>} data - raw data
   * @returns {Array<Offer>} - array of offers
   */
  static parseAll(data) {
    return data.map(Offer.parse);
  }
}
