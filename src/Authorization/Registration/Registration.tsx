import React, { type FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/* Redux */
import { type AppDispatch } from '../../redux/store';
import { type RootState } from '../../redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInputError,
  clearInputError,
} from '../../redux/reducers/formInputReducer/formInputActions';
import { setIsAuth } from '../../redux/reducers/isAuthReducer/isAuthReducer';
/* Components */
import FormInput from '../FormInput/FormInput';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import { Checkbox } from 'antd';
/* Style */
import './Registration.scss';
import '../Authorization.scss';

const Registration: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const inputs = useSelector((state: RootState) => state.inputs);
  const isAuth = useSelector((state: RootState) => state.isAuth.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(clearInputError());
      dispatch(setIsAuth(false));
      navigate('/sign-in');
    }
  }, [dispatch, isAuth, navigate]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const [username, email, password, repeatPassword] = inputs;

    async function register(): Promise<void> {
      if (password.value.length < 6) {
        dispatch(setInputError([password, '']));
        return;
      }

      if (repeatPassword.value !== password.value) {
        dispatch(setInputError([repeatPassword, '']));
        return;
      }

      const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          user: {
            username: username.value,
            email: email.value,
            password: password.value,
          },
        }),
      });

      const result = await response.json();
      if (result.errors !== undefined) {
        if (result.errors.email !== undefined) {
          dispatch(setInputError([email, result.errors.email]));
        }
        if (result.errors.username !== undefined) {
          dispatch(setInputError([username, result.errors.username]));
        }
        return;
      }

      dispatch(setIsAuth(true));
    }

    void register();
  };

  return (
    <form
      className="registration__form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        submitForm(e);
      }}
    >
      <h1 className="form__title">Create new account</h1>
      <FormInput key={1} element={inputs[0]} />
      <FormInput key={2} element={inputs[1]} />
      <FormInput key={3} element={inputs[2]} />
      <FormInput key={4} element={inputs[3]} />
      <div className="form__line"></div>
      <div className="form__agree">
        <Checkbox />
        <p className="form__agree--text">
          I agree to the processing of my
          <br />
          personal information
        </p>
      </div>
      <FormSubmitButton>Create</FormSubmitButton>
      <div className="form__link">
        Already have an account?
        <Link to="/sign-in" className="form__link--redirect">
          <pre> Sign In.</pre>
        </Link>
      </div>
    </form>
  );
};

export default Registration;
