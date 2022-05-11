import dayjs from 'dayjs';

/**
 * Compares two points by day
 * @param {Point} point1
 * @param {Point} point2
 */
const comparePointsByTime = (point1, point2) =>
  dayjs(point2.dateTo).diff(point2.dateFrom) -
  dayjs(point1.dateTo).diff(point1.dateFrom);

export default comparePointsByTime;
