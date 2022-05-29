import Actions from './actions';
import { DEFAULT_SORTING, DEFAULT_FILTER, AppMode } from '../../../const';
import { updatePoint, deletePoint } from '../../../utils';

const initialState = {
  points: [],
  offers: {},
  destinations: [],
  filter: DEFAULT_FILTER,
  sorting: DEFAULT_SORTING,
  mode: AppMode.PENDING,
};

const dataReducer = (state = initialState, action, payload) => {
  switch (action) {
    case Actions.FILTER_CHANGE:
      return {...state, filter: payload, sorting: DEFAULT_SORTING};
    case Actions.SORTING_CHANGE:
      return {...state, sorting: payload};
    case Actions.POINT_UPDATE:
      return {...state, points: updatePoint(payload, state.points)};
    case Actions.POINT_DELETE:
      return {...state, points: deletePoint(payload, state.points)};
    case Actions.MODE_CHANGE:
      return {...state, mode: payload};
    case Actions.DATA_LOADED:
      return {
        ...state,
        mode: AppMode.READY,
        points: payload.points,
        offers: payload.offers,
        destinations: payload.destinations
      };
    default:
      return state;
  }
};

export default dataReducer;
