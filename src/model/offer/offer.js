export default class Offer {

  /**
   * Creates new instance of offer
   * @param {Object} data - raw data
   */
  constructor(data) {
    this.id = String(data['id']);
    this.title = data['title'];
    this.price = Number(data['price']);
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
   * Creates offers model from raw data
   * @param {Object} data - raw data
   * @returns {Object} - offers
   */
  static parseAll(data) {
    const offersData = {};
    data.forEach(({type, offers}) => {
      offersData[type] = offers.map(Offer.parse);
    });

    return offersData;
  }
}
