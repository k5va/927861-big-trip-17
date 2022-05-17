import { comparePointsByDay, comparePointsByPrice, comparePointsByTime } from '../../utils';
import { Sorting } from '../../const';

/**
 * Sorts points
 * @param {Array<Point>} points - points
 * @param {String} sorting - sorting
 * @returns {Array<Point>} - points array
 */
const sortPoints = (points, sorting) => {
  switch (sorting) {
    case Sorting.DAY:
      return [...points].sort(comparePointsByDay);
    case Sorting.PRICE:
      return [...points].sort(comparePointsByPrice);
    case Sorting.TIME:
      return [...points.sort(comparePointsByTime)];
    default:
      throw new Error('Unsupported sorting');
  }
};

export default sortPoints;
