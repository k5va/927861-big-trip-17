export default class Destination {

  /**
   * Creates new instance of destination
   * @param {Object} data - raw data
   */
  constructor(data) {
    this.name = data['name'];
    this.description = data['description'];
    this.pictures = data['pictures'];
  }

  /**
   * Creates new offer from raw data
   * @param {Object} data - raw data
   * @returns {Destination} - destination
   */
  static parse(data) {
    return new Destination(data);
  }

  /**
   * Creates destinations array from raw data
   * @param {Array<Object>} data - raw data
   * @returns {Array<Destination>} - array of destinations
   */
  static parseAll(data) {
    return data.map(Destination.parse);
  }
}
