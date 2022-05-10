import dayjs from 'dayjs';

/**
 * Checks if point is current (i.e. (dateFrom < today) and (dateTo > today))
 * @param {Point} point - point obj
 * @returns {Boolean} - true if point is in future
 */
const isCurrentPoint = (point) => {
  const now = dayjs();
  const dateFrom = dayjs(point.dateFrom);
  const dateTo = dayjs(point.dateTo);

  return dateFrom.isBefore(now, 'D') || dateTo.isAfter(now, 'D');
};

export default isCurrentPoint;
