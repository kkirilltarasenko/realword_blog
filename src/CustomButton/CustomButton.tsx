import React, { type FC } from 'react';
/* Styles */
import './CustomButton.scss';

interface CustomButtonProps {
  value: string;
  style?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ value, style }): JSX.Element => {
  const classNames = ['authorize-button'];

  switch (style) {
    case 'success':
      classNames.push('authorize-button--success');
      break;
    default:
      break;
  }

  return <button className={classNames.join(' ')}>{value}</button>;
};

export default CustomButton;
