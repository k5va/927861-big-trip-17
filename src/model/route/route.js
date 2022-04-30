export default class Route {
  _points = [];

  /**
   * points getter
   * @returns {Array<Point>} - array of points
   */
  get points() {
    return [...this._points];
  }

  /**
   * points setter
   * @param {Array<Point>} points - array of points
   */
  set points(points) {
    this._points = [...points];
  }
}
