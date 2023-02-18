import React, { type FC } from 'react';
/* Components */
import CustomButton from '../CustomButton/CustomButton';
/* Style */
import './Header.scss';

const Header: FC = (): JSX.Element => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Realworld Blog</h1>
        <div className="header__buttons">
          <CustomButton key={0} value={'Sign in'} path={'/sign-in'} />
          <CustomButton key={1} value={'Sign up'} style={'success'} path={'/sign-up'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
