export default class Route {
  #points = [];

  /**
   * points getter
   * @returns {Array<Point>} - array of points
   */
  get points() {
    return [...this.#points];
  }

  /**
   * points setter
   * @param {Array<Point>} points - array of points
   */
  set points(points) {
    this.#points = [...points];
  }
}
