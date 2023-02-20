import React, { type FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import { type ActiveUserType } from '../redux/reducers/activeUserReducer/activeUserTypes';
import { type RootState } from '../redux/reducers/rootReducer';
import {
  setActiveUser,
  clearActiveUser,
} from '../redux/reducers/activeUserReducer/activeUserActions';
import { setIsAuth } from '../redux/reducers/isAuthReducer/isAuthReducer';
/* Components */
import CustomButton from '../CustomButton/CustomButton';
/* Style */
import './Header.scss';

const Header: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activeUser: ActiveUserType = useSelector((state: RootState) => state.activeUser);
  const isAuth = window.localStorage.getItem('isAuth');

  useEffect(() => {
    const user: ActiveUserType = JSON.parse(
      window.localStorage.getItem('user') ?? '{"null": null}'
    );
    dispatch(setActiveUser(user));
  }, [dispatch]);

  const logout = (): void => {
    window.localStorage.clear();
    dispatch(clearActiveUser());
    dispatch(setIsAuth(false));
    navigate('/sign-in');
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__title">
          Realworld Blog
        </Link>
        {isAuth === 'true' ? (
          <div className="header__profile">
            <div
              onClick={() => {
                console.log(1);
              }}
            >
              <CustomButton value={'Create article'} style={'create-article'} />
            </div>
            <Link to="/profile" className="header__profile--username">
              {activeUser.user.username}
            </Link>
            <Link to="/profile">
              <img
                src={
                  activeUser.user.image === undefined
                    ? 'https://friconix.com/png/fi-cnluxx-anonymous-user-circle.png'
                    : activeUser.user.image
                }
                className="header__profile--avatar"
                alt=""
              />
            </Link>
            <div
              onClick={() => {
                logout();
              }}
            >
              <CustomButton value={'Log Out'} style={'dark'} />
            </div>
          </div>
        ) : (
          <div className="header__buttons">
            <CustomButton key={0} value={'Sign in'} path={'/sign-in'} />
            <CustomButton key={1} value={'Sign up'} style={'success'} path={'/sign-up'} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
