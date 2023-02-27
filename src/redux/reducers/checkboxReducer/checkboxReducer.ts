import { SET_CHECKBOX } from '../../reduxActions';

const defaultValue: { checked: boolean } = {
  checked: false,
};

export const checkboxReducer = (
  state = defaultValue,
  action: { type: string; payload: boolean }
): { checked: boolean } => {
  switch (action.type) {
    case SET_CHECKBOX:
      return { ...state, checked: !state.checked };
    default:
      return state;
  }
};

export const setCheckbox = (): { type: string } => ({
  type: SET_CHECKBOX,
});
