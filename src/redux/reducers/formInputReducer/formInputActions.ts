import { type FormInputType } from './formInputTypes';
import { CLEAR_INPUT_ERROR, SET_INPUT_ERROR, SET_INPUT_VALUE } from '../../reduxActions';

export const setInputValue = (
  payload: [FormInputType, string]
): { type: string; payload: [FormInputType, string] } => ({
  type: SET_INPUT_VALUE,
  payload,
});

export const setInputError = (
  payload: [FormInputType, string]
): { type: string; payload: [FormInputType, string] } => ({
  type: SET_INPUT_ERROR,
  payload,
});

export const clearInputError = (): { type: string } => ({
  type: CLEAR_INPUT_ERROR,
});
