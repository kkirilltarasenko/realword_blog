import React, { type FC } from 'react';
/* Redux */
import { type AppDispatch } from '../../redux/store';
import { type RootState } from '../../redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginError } from '../../redux/reducers/loginErrorReducer/loginErrorReducer';
/* Components */
import FormInput from '../FormInput/FormInput';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
/* Style */
import './Profile.scss';
import '../Authorization.scss';
import { setActiveUser } from '../../redux/reducers/activeUserReducer/activeUserActions';

const Profile: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const activeUser = useSelector((state: RootState) => state.activeUser.user);
  const inputs = useSelector((state: RootState) => state.inputs);
  const isLoginError: boolean = useSelector((state: RootState) => state.isLoginError.isLoginError);

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const [username, email, , , password, img] = inputs;
    console.log(isLoginError);
    if (username.value === '' || email.value === '' || password.value === '' || img.value === '') {
      dispatch(setLoginError(true));
      return;
    }

    async function edit(): Promise<void> {
      dispatch(setLoginError(false));
      await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${activeUser.token}`,
        },
        body: JSON.stringify({
          user: {
            username: username.value,
            email: email.value,
            password: password.value,
            image: img.value,
          },
        }),
      });

      dispatch(
        setActiveUser({
          user: {
            email: email.value,
            token: activeUser.token,
            username: username.value,
            image: img.value,
          },
        })
      );

      window.localStorage.clear();
      window.localStorage.setItem('user', JSON.stringify(activeUser));
      window.localStorage.setItem('isAuth', JSON.stringify(true));
    }

    void edit();
  };

  return (
    <form
      className="profile__form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        submitForm(e);
      }}
    >
      <h1 className="form__title">Edit profile</h1>
      <FormInput element={inputs[0]} />
      <FormInput element={inputs[1]} />
      <FormInput element={inputs[4]} />
      <FormInput element={inputs[5]} />
      <div className={isLoginError ? 'form__error' : 'hidden'}>All fields are required.</div>
      <FormSubmitButton>Save</FormSubmitButton>
    </form>
  );
};

export default Profile;
