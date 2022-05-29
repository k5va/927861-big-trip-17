/**
 * Adds given point
 * @param {Point} newPoint - new point data
 * @param {Array<Point>} points - points array
 * @returns {Array<Point>} - updated array of points
 */
const addPoint = (newPoint, points) => [newPoint, ...points];

export default addPoint;
