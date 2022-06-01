/**
 * Deletes given point
 * @param {String} pointId - point id
 * @param {Array<Point>} points - points array
 * @returns {Array<Point>} - updated array of points
 */
const deletePoint = (pointId, points) => points.filter(({id}) => id !== pointId);

export default deletePoint;
