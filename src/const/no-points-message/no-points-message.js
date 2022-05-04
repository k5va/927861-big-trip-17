import { Filter } from '../../const';

const NoPointsMessage = {
  [Filter.EVERYTHING]: 'Click New Event to create your first point',
  [Filter.FUTURE]: 'There are no future events now',
  [Filter.PAST]: 'There are no past events now',
};

export default NoPointsMessage;
