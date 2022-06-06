import { PointType } from '../../const';

export default class Point {

  /**
   * Creates new instance of point
   * @param {Object} data - raw data
   */
  constructor(data) {
    this.id = String(data['id']);
    this.type = data['type'];
    this.dateFrom = new Date(data['date_from']);
    this.dateTo = new Date(data['date_to']);
    this.bestPrice = Number(data['base_price']);
    this.isFavorite = Boolean(data['is_favorite']);
    this.offers = data['offers'] ? data['offers'].map(String) : [];
    this.destination = data['destination']?.['name'];
  }

  /**
   * Serializes point back to server format
   * @returns {Object}
   */
  serialize() {
    const data = {
      ...this,
      'date_from': this.dateFrom ? this.dateFrom.toISOString() : null,
      'date_to': this.dateTo ? this.dateTo.toISOString() : null,
      'base_price': this.bestPrice,
      'is_favorite': this.isFavorite,
      'offers': this.offers.map(Number),
      'destination': {
        'name': this.destination,
        'description': ' ',
        'pictures': []
      },
    };

    delete data.dateFrom;
    delete data.dateTo;
    delete data.bestPrice;
    delete data.isFavorite;

    return data;
  }

  /**
   * Creates new point from raw data
   * @param {Object} data - raw data
   * @returns {Offer} - point
   */
  static parse(data) {
    return new Point(data);
  }

  /**
   * Creates points array from raw data
   * @param {Array<Object>} data - raw data
   * @returns {Array<Point>} - array of points
   */
  static parseAll(data) {
    return data.map(Point.parse);
  }

  /**
   * Creates blank point
   * @return {Point} - blank point
   */
  static createBlank() {
    return new Point({
      id: '',
      type: PointType.TAXI,
      'date_from': new Date(),
      'date_to': new Date(),
      'base_price': 0,
    });
  }
}
