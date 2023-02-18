import React, { type FC } from 'react';
/* Style */
import './FormSubmitButton.scss';

interface FormSubmitButtonProps {
  children: string;
}

const FormSubmitButton: FC<FormSubmitButtonProps> = ({ children }): JSX.Element => {
  return (
    <button className="form-submit-button" type="submit">
      {children}
    </button>
  );
};

export default FormSubmitButton;
