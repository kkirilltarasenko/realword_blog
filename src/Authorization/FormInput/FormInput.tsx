import React, { type ChangeEvent, type FC } from 'react';
/* Redux */
import { useDispatch } from 'react-redux';
import { setInputValue } from '../../redux/reducers/formInputReducer/formInputActions';
import { type FormInputType } from '../../redux/reducers/formInputReducer/formInputTypes';
import { type AppDispatch } from '../../redux/store';
/* Style */
import './FormInput.scss';

interface FormInputProps {
  element: FormInputType;
}

const FormInput: FC<FormInputProps> = ({ element }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const check: boolean = element.errorCheck;
  const inputClassNames = ['form-input__input'];
  if (check) {
    inputClassNames.push('form-input__input--error');
  }

  const changeValue = (element: FormInputType, value: string): void => {
    dispatch(setInputValue([element, value]));
  };

  return (
    <label className="form-input">
      <span className="form-input__label">{element.label}</span>
      <input
        className={inputClassNames.join(' ')}
        type={element.type}
        placeholder={element.placeholder}
        value={element.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          changeValue(element, e.target.value);
        }}
      />
      <span className={check ? 'form-input__error-text' : 'hidden'}>{element.error}</span>
    </label>
  );
};

export default FormInput;
