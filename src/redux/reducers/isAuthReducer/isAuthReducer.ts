import { SET_IS_AUTH } from '../../reduxActions';

const defaultState: { isAuth: boolean } = {
  isAuth: false,
};

export const isAuthReducer = (
  state = defaultState,
  action: { type: string; payload: boolean }
): { isAuth: boolean } => {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
};

export const setIsAuth = (payload: boolean): { type: string; payload: boolean } => ({
  type: SET_IS_AUTH,
  payload,
});
