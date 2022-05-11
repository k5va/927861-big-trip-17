/**
 * Compares two points by price
 * @param {Point} point1
 * @param {Point} point2
 */
const comparePointsByPrice = (point1, point2) => point2.bestPrice - point1.bestPrice;

export default comparePointsByPrice;
