import dayjs from 'dayjs';

/**
 * Compares two points by day
 * @param {Point} point1
 * @param {Point} point2
 */
const comparePointsByDay = (point1, point2) => dayjs(point1.dateFrom).diff(point2.dateFrom);

export default comparePointsByDay;
