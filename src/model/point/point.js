import {Destination} from '../../model';

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
    this.offers = data['offers'] ? data['offers'].map((offer) => String(offer['id'])) : [];
    this.destination = Destination.parse(data['destination']);
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
}
