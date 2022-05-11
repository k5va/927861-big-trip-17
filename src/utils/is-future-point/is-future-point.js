import dayjs from 'dayjs';

/**
 * Checks if point is in future
 * @param {Point} point - point obj
 * @returns {Boolean} - true if point is in future
 */
const isFuturePoint = (point) => {
  const now = dayjs();
  const dateFrom = dayjs(point.dateFrom);

  return dateFrom.isAfter(now, 'D') || dateFrom.isSame(now, 'D');
};

export default isFuturePoint;
