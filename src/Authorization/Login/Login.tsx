import React, { type FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/* Redux */
import { type AppDispatch } from '../../redux/store';
import { type RootState } from '../../redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../../redux/reducers/isAuthReducer/isAuthReducer';
import { setLoginError } from '../../redux/reducers/loginErrorReducer/loginErrorReducer';
import { setActiveUser } from '../../redux/reducers/activeUserReducer/activeUserActions';
/* Components */
import FormInput from '../FormInput/FormInput';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
/* Style */
import './Login.scss';
import '../Authorization.scss';

const Login: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const inputs = useSelector((state: RootState) => state.inputs);
  const isLoginError: boolean = useSelector((state: RootState) => state.isLoginError.isLoginError);
  const isAuth = useSelector((state: RootState) => state.isAuth.isAuth);

  useEffect(() => {
    dispatch(setLoginError(false));
    if (isAuth) {
      navigate('/');
    }
  }, [dispatch, isAuth, navigate]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    async function login(): Promise<void> {
      const email: string = inputs[1].value;
      const password: string = inputs[2].value;

      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });

      const result = await response.json();
      if (result.errors !== undefined) {
        dispatch(setLoginError(true));
        return;
      }

      window.localStorage.setItem('user', JSON.stringify(result));
      window.localStorage.setItem('isAuth', JSON.stringify(true));

      dispatch(setActiveUser(result));
      dispatch(setLoginError(false));
      dispatch(setIsAuth(true));
    }

    void login();
  };

  return (
    <form
      className="login__form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        submitForm(e);
      }}
    >
      <h1 className="form__title">Sign In</h1>
      <FormInput element={inputs[1]} />
      <FormInput element={inputs[2]} />
      <div className={isLoginError ? 'form__login--error' : 'hidden'}>
        Email or password are invalid.
      </div>
      <FormSubmitButton>Login</FormSubmitButton>
      <div className="form__link">
        Don`t have an account?
        <Link to="/sign-up" className="form__link--redirect">
          <pre> Sign Up.</pre>
        </Link>
      </div>
    </form>
  );
};

export default Login;
