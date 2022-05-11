import { Filter } from '../../const';
import { isFuturePoint, isPastPoint, isCurrentPoint } from '../../utils';

const PointFilter = {
  [Filter.EVERYTHING]: (points) => [...points],
  [Filter.FUTURE]: (points) => points.filter((point) => isFuturePoint(point) || isCurrentPoint(point)),
  [Filter.PAST]: (points) => points.filter((point) => isPastPoint(point) || isCurrentPoint(point)),
};

export default PointFilter;
