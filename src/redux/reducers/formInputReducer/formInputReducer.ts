import { SET_INPUT_VALUE, SET_INPUT_ERROR, CLEAR_INPUT_ERROR } from '../../reduxActions';
import { type FormInputType } from './formInputTypes';
import { defaultState } from './formInputState';

export const formInputReducer = (
  state = defaultState,
  action: { type: string; payload: [FormInputType, string] }
): FormInputType[] => {
  switch (action.type) {
    case SET_INPUT_VALUE:
      return state.map((el) => {
        if (el.id === action.payload[0].id) {
          el.value = action.payload[1];
        }

        return el;
      });
    case SET_INPUT_ERROR:
      return state.map((el) => {
        if (el.label === action.payload[0].label) {
          el.errorCheck = true;
          el.error = `${el.label} ${action.payload[1]}`;
        }

        return el;
      });
    case CLEAR_INPUT_ERROR:
      return state.map((el) => {
        el.errorCheck = false;
        el.value = '';
        return el;
      });
    default:
      return state;
  }
};
