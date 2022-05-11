import dayjs from 'dayjs';

/**
 * Checks if point is in the past
 * @param {Point} point - point obj
 * @returns {Boolean} - true if point is in the past
 */
const isPastPoint = (point) => {
  const now = dayjs();
  const dateTo = dayjs(point.dateTo);

  return dateTo.isBefore(now, 'D');
};

export default isPastPoint;
