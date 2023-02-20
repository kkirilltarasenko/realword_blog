import React, { type FC } from 'react';
import { Link } from 'react-router-dom';
/* Styles */
import './CustomButton.scss';

interface CustomButtonProps {
  value: string;
  style?: string;
  path?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ value, style, path }): JSX.Element => {
  const classNames = ['authorize-button'];

  switch (style) {
    case 'success':
      classNames.push('authorize-button--success');
      break;
    case 'dark':
      classNames.push('authorize-button--dark');
      break;
    case 'create-article':
      classNames.push('authorize-button--create-article');
      break;
    default:
      break;
  }

  return path !== undefined ? (
    <button className={classNames.join(' ')}>
      <Link className="authorize-button__link" to={path}>
        {value}
      </Link>
    </button>
  ) : (
    <button className={classNames.join(' ')}>{value}</button>
  );
};

export default CustomButton;
