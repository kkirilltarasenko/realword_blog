import { SET_CURRENT } from '../../reduxActions';

const defaultState: { current: number } = {
  current: 1,
};

export const currentReducer = (
  state = defaultState,
  action: { type: string; payload: number }
): { current: number } => {
  switch (action.type) {
    case SET_CURRENT:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export const setCurrent = (payload: number): { type: string; payload: number } => ({
  type: SET_CURRENT,
  payload,
});
