import { PointFilter } from '../../const';

/**
 * filters points
 * @param {Array<Point>} points - points
 * @param {String} filter - filter
 * @returns {Array<Point>} - points array
 */
const filterPoints = (points, filter) => PointFilter[filter](points);

export default filterPoints;
