import { SET_ACTIVE_USER, CLEAR_ACTIVE_USER } from '../../reduxActions';
import { type ActiveUserType } from './activeUserTypes';
import { defaultState } from './activeUserState';

export const activeUserReducer = (
  state = defaultState,
  action: { type: string; payload: ActiveUserType }
): ActiveUserType => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return { ...state, user: action.payload.user };
    case CLEAR_ACTIVE_USER:
      return { ...state, user: defaultState.user };
    default:
      return state;
  }
};
