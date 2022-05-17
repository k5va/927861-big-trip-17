/**
 * Updates given point
 * @param {Point} updatedPoint - point data
 * @param {Array<Point>} points - points array
 * @returns {Array<Point>} - updated array of points
 */
const updatePoint = (updatedPoint, points) => {
  const index = points.findIndex(({id}) => id === updatedPoint.id);
  if (index === -1) {
    throw new Error (`No such point ${updatedPoint.id}`);
  }

  return [...points.slice(0, index), updatedPoint, ...points.slice(index + 1)];
};

export default updatePoint;
