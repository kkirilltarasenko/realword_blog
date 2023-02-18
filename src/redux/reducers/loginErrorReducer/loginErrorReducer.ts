import { SET_LOGIN_ERROR } from '../../reduxActions';

const defaultState: { isLoginError: boolean } = {
  isLoginError: false,
};

export const loginErrorReducer = (
  state = defaultState,
  action: { type: string; payload: boolean }
): { isLoginError: boolean } => {
  switch (action.type) {
    case SET_LOGIN_ERROR:
      return { ...state, isLoginError: action.payload };
    default:
      return state;
  }
};

export const setLoginError = (payload: boolean): { type: string; payload: boolean } => ({
  type: SET_LOGIN_ERROR,
  payload,
});
