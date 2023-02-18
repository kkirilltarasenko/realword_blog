import { SET_OFFSET } from '../../reduxActions';

const defaultState: { offset: number } = {
  offset: 0,
};

export const offsetReducer = (
  state = defaultState,
  action: { type: string; payload: number }
): { offset: number } => {
  switch (action.type) {
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    default:
      return state;
  }
};

export const setOffset = (payload: number): { type: string; payload: number } => ({
  type: SET_OFFSET,
  payload,
});
