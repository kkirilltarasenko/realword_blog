import { SET_ACTIVE_USER, CLEAR_ACTIVE_USER } from '../../reduxActions';
import { type ActiveUserType } from './activeUserTypes';

export const setActiveUser = (
  payload: ActiveUserType
): { type: string; payload: ActiveUserType } => ({
  type: SET_ACTIVE_USER,
  payload,
});

export const clearActiveUser = (): { type: string } => ({
  type: CLEAR_ACTIVE_USER,
});
